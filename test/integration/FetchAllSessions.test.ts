import { FetchSessions } from "@/application/usecase/fetch-sessions/FetchSessions"
import { FetchSessionsInput } from "@/application/usecase/fetch-sessions/FetchSessionsInput"
import { Session } from "@/domain/entity/Session"
import { InMemorySessionRepository } from "@/infra/persistence/in-memory/InMemorySessionRepository"


let sessionRepository:InMemorySessionRepository

beforeAll(async ()=>{
    sessionRepository = new InMemorySessionRepository()
    for(let i=0;i<25;i++){
        const session = new Session("Session3")
        await sessionRepository.create(session)
    }

})


test("Deve retornar todas as sessions existentes na pagina 1 (20)",async ()=>{


    const fetchAllSessions = new FetchSessions(sessionRepository)
    const input = new FetchSessionsInput(1)
    const output = await fetchAllSessions.execute(input)
    expect(output.sessions).toHaveLength(20)
})

test("Deve retornar todas as sessions existentes na pagina 1 (5)",async ()=>{
    const fetchAllSessions = new FetchSessions(sessionRepository)
    const input = new FetchSessionsInput(2)
    const output = await fetchAllSessions.execute(input)
    expect(output.sessions).toHaveLength(5)
})