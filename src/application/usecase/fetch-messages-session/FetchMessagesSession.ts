import { MessageRepository } from "@/domain/repository/MessageRepository";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { UserRepository } from "@/domain/repository/UserRepository";
import { FetchMessagesSessionInput } from "./FetchMessagesSessionInput";
import { FetchMessagesSessionOutput } from "./FetchMessagesSessionOutput";
import { UserNotFoundError } from "@/application/errors/UserNotFoundError";
import { SessionNotFoundError } from "@/application/errors/SessionNotFoundError";

export class FetchMessagesSession{
    constructor(readonly sessionRepository:SessionRepository,readonly messageRepository:MessageRepository,readonly userRepository:UserRepository){

    }

    async execute(input:FetchMessagesSessionInput):Promise<FetchMessagesSessionOutput>{
        const user = await this.userRepository.findById(input.userId)
        if(!user) throw new UserNotFoundError()
        const session = await this.sessionRepository.findById(input.sessionId)
        if(!session) throw new SessionNotFoundError()
        const messages = await this.messageRepository.findBySession(session.getId())
        const outputData = []
        for(const message of messages){
            const messageUser = await this.userRepository.findById(message.userId)
            if(messageUser){
                outputData.push({userName:messageUser.getUserName(),content:message.content,date:message.getDate()})
            }
        }
        const output = new FetchMessagesSessionOutput(outputData)
        return output
        

    }
}