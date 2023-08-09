import { SendMessage } from "@/application/usecase/send-message/SendMessage"
import { SendMessageInput } from "@/application/usecase/send-message/SendMessageInput"
import { Message } from "@/domain/entity/Message"
import { Session } from "@/domain/entity/Session"
import { User } from "@/domain/entity/User"
import { UniqueEntityID } from "@/domain/entity/value_object/UniqueEntityId"
import { MessageRepository } from "@/domain/repository/MessageRepository"
import { SessionRepository } from "@/domain/repository/SessionRepository"
import { UserRepository } from "@/domain/repository/UserRepository"
import { InMemoryMessageRepository } from "@/infra/repository/in-memory/InMemoryMessageRepository"
import { InMemorySessionRepository } from "@/infra/repository/in-memory/InMemorySessionRepository"
import { InMemoryUserRepository } from "@/infra/repository/in-memory/InMemoryUserRepository"


let sessionRepository:SessionRepository
let messageRepository:MessageRepository
let userRepository:UserRepository
let session:Session
let user:User

beforeEach(async ()=>{
    sessionRepository = new InMemorySessionRepository()
    messageRepository = new InMemoryMessageRepository()
    userRepository = new InMemoryUserRepository()
    user = new User("userNameTest","123456")
    session = new Session("sessao_1")
    await sessionRepository.create(session)
    await userRepository.create(user)
})

test("O usuário deve falhar tentar enviar uma mensagem de um sessão que nao existe",async ()=>{
    const sendMessage = new SendMessage(sessionRepository,messageRepository,userRepository)
    const input = new SendMessageInput(user.getId(),"session-id-1","Hello world")
    expect(async()=>await sendMessage.execute(input)).rejects.toThrow("Session not found")
})

test("O usuário deve falhar tentar enviar uma mensagem de um usuário que nao existe",async ()=>{
    const sendMessage = new SendMessage(sessionRepository,messageRepository,userRepository)
    const input = new SendMessageInput("user-id-1",session.getId(),"Hello world")
    expect(async()=>await sendMessage.execute(input)).rejects.toThrow("User not found")
})

test("O usuário deve conseguir enviar uma mensagem na sessao",async ()=>{
    const sendMessage = new SendMessage(sessionRepository,messageRepository,userRepository)
    const input = new SendMessageInput(user.getId(),session.getId(),"Hello world")
    await sendMessage.execute(input)
})