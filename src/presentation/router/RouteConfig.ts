
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import  { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";
import { AuthenticateUserController } from "../controller/http/AuthenticateUserController";
import { CreateSessionController } from "../controller/http/CreateSessionController";
import { CreateUserController } from "../controller/http/CreateUserController";
import { FetchMessagesSessionController } from "../controller/http/FetchMessagesSessionController";
import { FetchSessionsController } from "../controller/http/FetchSessionsController";
import { WebFramework } from "../core/WebFramework";
import { MessagesController } from "../controller/websocket/MessagesController";

export class RouteConfig {
  constructor(app: WebFramework, repositoryFactory: RepositoryFactory) {
    app.on("/users", "post",[],new CreateUserController(repositoryFactory))
    app.on("/authenticate", "post",[],new AuthenticateUserController(repositoryFactory))
    app.on("/room","post",[],new CreateSessionController(repositoryFactory))
    app.on("/rooms/:page","get",[app.verifyToken],new FetchSessionsController(repositoryFactory))
    app.on("/messages/:sessionId","get",[app.verifyToken],new FetchMessagesSessionController(repositoryFactory))
    app.ws("/","get",[],new MessagesController(repositoryFactory))
  }
}

