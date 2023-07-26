import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { CreateUserController } from "../../presentation/controller/CreateUserController";
import { WebFramework } from "../core/WebFramework";
import { AuthenticateUserController } from "../controller/AuthenticateUserController";
import { CreateSessionController } from "../controller/CreateSessionController";

export class RouteConfig {
  constructor(wf: WebFramework, repositoryFactory: RepositoryFactory) {
    wf.on("/users", "post",[],new CreateUserController(repositoryFactory))
    wf.on("/authenticate", "post",[],new AuthenticateUserController(repositoryFactory))
    wf.on("/room","post",[],new CreateSessionController(repositoryFactory))
  }
}
