import { UserRepository } from "@/domain/repository/UserRepository";
import { User } from "@/domain/entity/User";
import { CreateUserInput } from "../create-user/CreateUserInput";
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