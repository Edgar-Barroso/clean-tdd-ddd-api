import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { env } from "@/env";
import { WebFramework } from "../core/WebFramework";
import { Controller } from "../core/Controller";
import { HttpRequest } from "../core/HttpRequest";
import { HttpResponse } from "../core/HttpResponse";
import fastify, { FastifyRequest, FastifyReply} from "fastify/fastify";
import  websocketPlugin  from "@fastify/websocket";
import  { SocketStream } from "@fastify/websocket";
import cors from "@fastify/cors";
import jwt from 'jsonwebtoken';
import { ValidationError } from "@/domain/entity/errors/ValidationError";
import { UserNotFoundError } from "@/application/errors/UserNotFoundError";
import { SessionNotFoundError } from "@/application/errors/SessionNotFoundError";

export class FastifyAdapter implements WebFramework {
  app: any;

  constructor() {
    this.app = fastify();
    this.app.register(websocketPlugin);
    this.app.register(cors, {
      origin:true,
      credentials: true,
    }); 
    this.app.register(fastifyCookie);
    this.app.register(fastifyJwt, {
      secret: env.JWT_SECRET,
    });

    this.app.setErrorHandler((error:Error, _:any, reply:FastifyReply) => {
      if (error instanceof Error){
        return reply
            .status(400)
            .send({ message:error.message});
      }
      if (env.NODE_ENV !== "production") {
          console.error(error);
      } else {
          // fazer o log para uma ferramenta externa ex: DataDog/NewReplic/Sentry
      }
  
      return reply.status(500).send({ message: "Internal server error." });
  });
  }

  ws(url: string, method: string, middlewares: any[], controller: any): void {
    this.app.register(async function (fastify: any) {
      fastify[method](url, { websocket: true, onRequest: middlewares }, async (connection: SocketStream, req: FastifyRequest) => {
        try {
          const { token } = req.query as { token: string };
          const decodedToken = jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] });
          req.user = decodedToken;
        } catch (err) {
          connection.socket.close(4000, 'Falha na autenticação do WebSocket');
          return;
        }
        controller.execute(connection, req);
      });
    });
  }
  
  on(url: string, method: string,middlewares:any[],controller: Controller): void {
    this.app[method](url, {onRequest:middlewares},async (request: FastifyRequest, reply: FastifyReply) => {
      const httpRequest:HttpRequest = {
        body:request.body,
        params:request.params,
        //@ts-ignore
        user:request.user ?? undefined
      }
      const response:HttpResponse = await controller.execute(httpRequest)
      if(response.token){
        const {header,payload}  = response.token
        response.body.token = await reply.jwtSign(header,payload)
      }
      return reply.status(response.statusCode).send(response.body);
    });
  }

  async verifyToken(request: FastifyRequest, reply: FastifyReply){
    try{
      await request.jwtVerify()
    }catch{
      return reply.status(401).send({message:'Unauthorized.'})
    }
  }


  listen(port: number): void {
    this.app
      .listen({
        port: port,
      })
      .then(() => {
        console.log(`🚀 HTTP Server Running! PORT:${port}`);
      });
  }

  close(): void {
    this.app.close().then(() => {
      console.log("Server closed.");
    });
  }
}
