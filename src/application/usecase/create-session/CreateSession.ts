import { SessionRepository } from "@/domain/repository/SessionRepository";
import { Session } from "@/domain/entity/Session";
import { CreateSessionInput } from "./CreateSessionInput";

export class CreateSession{
    constructor(readonly sessionRepository:SessionRepository){}

    async execute(input:CreateSessionInput):Promise<void>{
        const session = new Session(input.name)
        await this.sessionRepository.create(session)
        
    }
}