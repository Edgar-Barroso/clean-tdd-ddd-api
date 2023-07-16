import { SendMessage } from "@/application/usecase/send-message/SendMessage"
import { SendMessageInput } from "@/application/usecase/send-message/SendMessageInput"
import { Message } from "@/domain/entity/Message"
import { Session } from "@/domain/entity/Session"
import { User } from "@/domain/entity/User"
import { UniqueEntityID } from "@/domain/entity/value_object/UniqueEntityId"
import { MessageRepository } from "@/domain/repository/MessageRepository"
import { SessionRepository } from "@/domain/repository/SessionRepository"
import { UserRepository } from "@/domain/repository/UserRepository"
import { InMemoryMessageRepository } from "@/infra/persistence/in-memory/InMemoryMessageRepository"
import { InMemorySessionRepository } from "@/infra/persistence/in-memory/InMemorySessionRepository"
import { InMemoryUserRepository } from "@/infra/persistence/in-memory/InMemoryUserRepository"

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
    session.addUserId(user.getId())
    await sessionRepository.create(session)
    await userRepository.create(user)
})

test("O usuário deve falhar tentar enviar uma mensagem na sessao em que nao esta autorizado",async ()=>{
    const user2 = new User("userNameTest2","123456")
    await userRepository.create(user2)
    const sendMessage = new SendMessage(sessionRepository,messageRepository,userRepository)
    const input = new SendMessageInput("Hello world",user2.getId(),session.getId())
    expect(async()=>await sendMessage.execute(input)).rejects.toThrow("User not authorized")
})

test("O usuário deve falhar tentar enviar uma mensagem de um sessão que nao existe",async ()=>{
    const sendMessage = new SendMessage(sessionRepository,messageRepository,userRepository)
    const input = new SendMessageInput("Hello world",user.getId(),new UniqueEntityID().getValue())
    expect(async()=>await sendMessage.execute(input)).rejects.toThrow("Session not found")
})

test("O usuário deve falhar tentar enviar uma mensagem de um usuário que nao existe",async ()=>{
    const sendMessage = new SendMessage(sessionRepository,messageRepository,userRepository)
    const input = new SendMessageInput("Hello world",new UniqueEntityID().getValue(),session.getId())
    expect(async()=>await sendMessage.execute(input)).rejects.toThrow("User not found")
})

test("O usuário deve conseguir enviar uma mensagem na sessao",async ()=>{
    const sendMessage = new SendMessage(sessionRepository,messageRepository,userRepository)
    const input = new SendMessageInput("Hello world",user.getId(),session.getId())
    await sendMessage.execute(input)
})