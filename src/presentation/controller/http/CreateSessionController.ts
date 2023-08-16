import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";

import { SessionRepository } from "@/domain/repository/SessionRepository";
import { CreateSession } from "@/application/usecase/create-session/CreateSession";
import { CreateSessionInput } from "@/application/usecase/create-session/CreateSessionInput";
import { Controller } from "@/presentation/core/Controller";
import { HttpRequest } from "@/presentation/core/HttpRequest";
import { HttpResponse } from "@/presentation/core/HttpResponse";

export class CreateSessionController implements Controller{
    sessionRepository:SessionRepository;
    constructor(repositoryFactory:RepositoryFactory){
        this.sessionRepository = repositoryFactory.createSessionRepository()
    }

    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const createSession = new CreateSession(this.sessionRepository)
        const input = new CreateSessionInput(httpRequest.body.name)
        await createSession.execute(input)
        return {statusCode:201}
    }

}