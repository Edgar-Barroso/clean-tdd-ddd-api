import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { Controller } from "../core/Controller";
import { HttpRequest } from "../core/HttpRequest";
import { HttpResponse } from "../core/HttpResponse";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { CreateSession } from "@/application/usecase/create-session/CreateSession";
import { CreateSessionInput } from "@/application/usecase/create-session/CreateSessionInput";
import { badRequest, conflict, created, internalServerError } from "../helpers/http-helper";

export class CreateSessionController implements Controller{
    sessionRepository:SessionRepository;
    constructor(repositoryFactory:RepositoryFactory){
        this.sessionRepository = repositoryFactory.createSessionRepository()
    }

    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const createSession = new CreateSession(this.sessionRepository)
        const input = new CreateSessionInput(httpRequest.body.name)
        if(!input.isValid()) return badRequest({error:"Missing params"})

        try{
            await createSession.execute(input)
            return created()

        }catch(error){
            return internalServerError()
            }
        }
    
    }