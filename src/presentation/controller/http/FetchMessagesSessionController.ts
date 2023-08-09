import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";

import { MessageRepository } from "@/domain/repository/MessageRepository";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { UserRepository } from "@/domain/repository/UserRepository";
import { UserNotFoundError } from "@/application/errors/UserNotFoundError";
import { SessionNotFoundError } from "@/application/errors/SessionNotFoundError";
import { FetchMessagesSession } from "@/application/usecase/fetch-messages-session/FetchMessagesSession";
import { FetchMessagesSessionInput } from "@/application/usecase/fetch-messages-session/FetchMessagesSessionInput";
import { Controller } from "@/presentation/core/Controller";
import { HttpRequest } from "@/presentation/core/HttpRequest";
import { HttpResponse } from "@/presentation/core/HttpResponse";
import { badRequest, ok, notFound, internalServerError } from "@/presentation/helpers/http-helper";

export class FetchMessagesSessionController implements Controller{
    sessionRepository: SessionRepository;
    messageRepository: MessageRepository;
    userRepository: UserRepository;
    constructor(repositoryFactory:RepositoryFactory){
        this.sessionRepository = repositoryFactory.createSessionRepository()
        this.messageRepository = repositoryFactory.createMessageRepository()
        this.userRepository = repositoryFactory.createUserRepository()
    }
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const fetchMessagesSession = new FetchMessagesSession(this.sessionRepository,this.messageRepository,this.userRepository)
        const input = new FetchMessagesSessionInput(httpRequest.user!.sub,httpRequest.params.sessionId)
        const {messages} = await fetchMessagesSession.execute(input)
        return {statusCode:200,body:{messages}}

    }
    
}