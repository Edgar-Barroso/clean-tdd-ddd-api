import { DeleteSession } from "@/application/usecase/delete-session/DeleteSession"
import { DeleteSessionInput } from "@/application/usecase/delete-session/DeleteSessionInput"
import { Message } from "@/domain/entity/Message"
import { Session } from "@/domain/entity/Session"
import { User } from "@/domain/entity/User"
import { MessageRepository } from "@/domain/repository/MessageRepository"
import { SessionRepository } from "@/domain/repository/SessionRepository"
import { InMemoryMessageRepository } from "@/infra/repository/in-memory/InMemoryMessageRepository"
import { InMemorySessionRepository } from "@/infra/repository/in-memory/InMemorySessionRepository"

let sessionRepository:SessionRepository
let messageRepository:MessageRepository
let session:Session

beforeEach(async ()=>{
    sessionRepository = new InMemorySessionRepository()
    messageRepository = new InMemoryMessageRepository()
    const user = new User("userNameTest","123456")
    session = new Session("sessao_1")
    const message1 = new Message("hello world 1",user.getId(),session.getId())
    const message2 = new Message("hello world 2",user.getId(),session.getId())
    const message3 = new Message("hello world 3",user.getId(),session.getId())
    await sessionRepository.create(session)
    await messageRepository.create(message1)
    await messageRepository.create(message2)
    await messageRepository.create(message3)
})


test("Deve ser possivel apagar uma sessão",async ()=>{
    const input = new DeleteSessionInput(session.getId())
    const deleteSession =  new DeleteSession(sessionRepository, messageRepository)
    await deleteSession.execute(input)

})

test("Deve levanter um erro ao tentar apagar uma sessão inexistente",async ()=>{
    const input = new DeleteSessionInput("id-inexistente")
    const deleteSession =  new DeleteSession(sessionRepository, messageRepository)
    expect(async ()=>await deleteSession.execute(input)).rejects.toThrow("Session not found")

})

