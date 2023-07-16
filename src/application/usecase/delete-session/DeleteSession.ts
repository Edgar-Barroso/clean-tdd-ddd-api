import { SessionRepository } from "@/domain/repository/SessionRepository";
import { Session } from "@/domain/entity/Session";
import { DeleteSessionInput } from "./DeleteSessionInput";
import { MessageRepository } from "@/domain/repository/MessageRepository";

export class DeleteSession{
    constructor(readonly sessionRepository:SessionRepository,readonly messageRepository:MessageRepository){}

    async execute(input:DeleteSessionInput):Promise<void>{
        const session = await this.sessionRepository.findById(input.sessionId)
        if(!session) throw new Error("Session not found")
        const messages = await this.messageRepository.findBySession(session.getId())
        for(const message of messages){
            await this.messageRepository.delete(message)
        }
    }
}