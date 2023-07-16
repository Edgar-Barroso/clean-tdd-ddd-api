import { CreateSession } from "@/application/usecase/create-session/CreateSession"
import { CreateSessionInput } from "@/application/usecase/create-session/CreateSessionInput"
import { InMemorySessionRepository } from "@/infra/persistence/in-memory/InMemorySessionRepository"


test("Deve criar uma sessao",async ()=>{
    const userRepository = new InMemorySessionRepository()
    const createSession = new CreateSession(userRepository)
    const input = new CreateSessionInput("sessao1")
    await createSession.execute(input)
})
