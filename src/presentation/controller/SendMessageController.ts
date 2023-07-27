import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { Controller } from "../core/Controller";
import { HttpRequest } from "../core/HttpRequest";
import { HttpResponse } from "../core/HttpResponse";
import { SendMessage } from "@/application/usecase/send-message/SendMessage";
import { MessageRepository } from "@/domain/repository/MessageRepository";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { UserRepository } from "@/domain/repository/UserRepository";
import { SendMessageInput } from "@/application/usecase/send-message/SendMessageInput";
import { badRequest, internalServerError, notFound, ok } from "../helpers/http-helper";
import { UserNotFoundError } from "@/application/errors/UserNotFoundError";
import { SessionNotFoundError } from "@/application/errors/SessionNotFoundError";

export class SendMessageController implements Controller{
    sessionRepository: SessionRepository;
    messageRepository: MessageRepository;
    userRepository: UserRepository;
    constructor(repositoryFactory:RepositoryFactory){
        this.sessionRepository = repositoryFactory.createSessionRepository()
        this.messageRepository = repositoryFactory.createMessageRepository()
        this.userRepository = repositoryFactory.createUserRepository()
    }
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const sendMessage = new SendMessage(this.sessionRepository,this.messageRepository,this.userRepository)
        const input = new SendMessageInput(httpRequest.body.content,httpRequest.body.userId,httpRequest.body.sessionId)
        if(!input.isValid()) return badRequest({error:"Missing params"})

        try{
            await sendMessage.execute(input)
            return ok({})

        }catch(error){
            if(error instanceof UserNotFoundError){
                return notFound({error:error.message})
            }
            if(error instanceof SessionNotFoundError){
                return notFound({error:error.message})
            }
            else{
                return internalServerError()
            }
        }
    }
    
}