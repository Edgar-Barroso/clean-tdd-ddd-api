import { AddUserToSession } from "@/application/usecase/add-user-to-session/AddUserToSession"
import { AddUserToSessionInput } from "@/application/usecase/add-user-to-session/AddUserToSessionInput"
import { SendMessage } from "@/application/usecase/send-message/SendMessage"
import { SendMessageInput } from "@/application/usecase/send-message/SendMessageInput"
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

beforeEach(async ()=>{
    sessionRepository = new InMemorySessionRepository()
    messageRepository = new InMemoryMessageRepository()
    userRepository = new InMemoryUserRepository()
})

test("Deve falhar tentar adicionar um usuário que nao existe",async ()=>{
    const session = new Session("sessao-1")
    await sessionRepository.create(session)
    const addUserToSession = new AddUserToSession(sessionRepository,userRepository)
    const input = new AddUserToSessionInput(new UniqueEntityID().getValue(),session.getId())
    expect(async()=>await addUserToSession.execute(input)).rejects.toThrow("User not found")
})

test("Deve falhar tentar adicionar um usuário a uma sessão que nao existe",async ()=>{
    const user = new User("userNameTest","123456")
    await userRepository.create(user)
    const addUserToSession = new AddUserToSession(sessionRepository,userRepository)
    const input = new AddUserToSessionInput(user.getId(),new UniqueEntityID().getValue())
    expect(async()=>await addUserToSession.execute(input)).rejects.toThrow("Session not found")
})

test("Deve adicionar um usuário numa sessão",async ()=>{
    const user = new User("userNameTest","123456")
    await userRepository.create(user)
    const session = new Session("sessao-1")
    await sessionRepository.create(session)
    const addUserToSession = new AddUserToSession(sessionRepository,userRepository)
    const input = new AddUserToSessionInput(user.getId(),session.getId())
    await addUserToSession.execute(input)
})