import { SessionRepository } from "@/domain/repository/SessionRepository";
import { FetchSessionsInput } from "./FetchSessionsInput";
import { FetchSessionsOutput } from "./FetchSessionsOutput";

export class FetchSessions{
    constructor(readonly sessionRepository:SessionRepository){

    }

    async execute(input:FetchSessionsInput):Promise<FetchSessionsOutput>{
        const sessions = await this.sessionRepository.fetchPage(input.page)
        const output = new FetchSessionsOutput(sessions.map(item=>({id:item.getId(),name:item.name})))
        return output
        
    }
}