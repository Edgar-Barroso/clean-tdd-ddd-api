import { MessageRepository } from "@/domain/repository/MessageRepository";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { UserRepository } from "@/domain/repository/UserRepository";
import { AddUserToSessionInput } from "./AddUserToSessionInput";

export class AddUserToSession{
    constructor(readonly sessionRepository:SessionRepository,readonly userRepository:UserRepository){
        
    }
    async execute(input:AddUserToSessionInput):Promise<void>{
        const user = await this.userRepository.findById(input.userId)
        if(!user) throw new Error("User not found")
        const session = await this.sessionRepository.findById(input.sessionId)
        if(!session)throw new Error("Session not found")
        session.addUserId(user.getId())
        await this.sessionRepository.update(session)
    }
}