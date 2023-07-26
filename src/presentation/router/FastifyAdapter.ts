import fastify from "fastify";
import { FastifyRequest, FastifyReply } from "fastify";
import websocketPlugin from "@fastify/websocket";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { env } from "@/env";
import { WebFramework } from "../core/WebFramework";
import { Controller } from "../core/Controller";
import { HttpRequest } from "../core/HttpRequest";
import { HttpResponse } from "../core/HttpResponse";

export class FastifyAdapter implements WebFramework {
  app: any;

  constructor() {
    this.app = fastify();
    this.app.register(websocketPlugin);
    this.app.register(fastifyCookie);
    this.app.register(fastifyJwt, {
      secret: env.JWT_SECRET,
    });
  }




  on(url: string, method: string,middlewares:any[],controller: Controller,): void {
    this.app[method](url, {onRequest:middlewares},async (request: FastifyRequest, reply: FastifyReply) => {
      const httpRequest:HttpRequest = {
        body:request.body,
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
        console.log("🚀 HTTP Server Running!");
      });
  }

  close(): void {
    this.app.close().then(() => {
      console.log("Server closed.");
    });
  }
}
