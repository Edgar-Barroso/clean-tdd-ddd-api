import { MessageRepository } from "@/domain/repository/MessageRepository";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { UserRepository } from "@/domain/repository/UserRepository";
import { GetMessagesSessionInput } from "./GetMessagesSessionInput";
import { GetMessagesSessionOutput } from "./GetMessagesSessionOutput";

export class GetMessagesSession{
    constructor(readonly sessionRepository:SessionRepository,readonly messageRepository:MessageRepository,readonly userRepository:UserRepository){

    }

    async execute(input:GetMessagesSessionInput):Promise<GetMessagesSessionOutput>{
        const user = await this.userRepository.findById(input.userId)
        if(!user) throw new Error("User not found")
        const session = await this.sessionRepository.findById(input.sessionId)
        if(!session) throw new Error("Session not found")
        const messages = await this.messageRepository.findBySession(session.getId())
        const outputData = []
        for(const message of messages){
            const messageUser = await this.userRepository.findById(message.userId)
            if(messageUser){
                outputData.push({userName:messageUser.getUserName(),content:message.content,date:message.getDate()})
            }
        }
        const output = new GetMessagesSessionOutput(outputData)
        return output
        

    }
}