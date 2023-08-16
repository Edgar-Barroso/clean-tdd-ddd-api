import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";

import { MessageRepository } from "@/domain/repository/MessageRepository";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { UserRepository } from "@/domain/repository/UserRepository";
import { UserNotFoundError } from "@/application/errors/UserNotFoundError";
import { SessionNotFoundError } from "@/application/errors/SessionNotFoundError";
import { FetchSessions } from "@/application/usecase/fetch-sessions/FetchSessions";
import { FetchSessionsInput } from "@/application/usecase/fetch-sessions/FetchSessionsInput";
import { Controller } from "@/presentation/core/Controller";
import { HttpRequest } from "@/presentation/core/HttpRequest";
import { HttpResponse } from "@/presentation/core/HttpResponse";

export class FetchSessionsController implements Controller{
    sessionRepository: SessionRepository;
    constructor(repositoryFactory:RepositoryFactory){
        this.sessionRepository = repositoryFactory.createSessionRepository()
    }
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const fetchSessions = new FetchSessions(this.sessionRepository)
        const input = new FetchSessionsInput(httpRequest.params.page)
        const {sessions} = await fetchSessions.execute(input)
        return {statusCode:200,body:{sessions}}

    }
    
}