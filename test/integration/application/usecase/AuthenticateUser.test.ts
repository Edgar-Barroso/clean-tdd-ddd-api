
import { AuthenticateUser } from "@/application/usecase/authenticade-user/AuthenticateUser"
import { AuthenticateUserInput } from "@/application/usecase/authenticade-user/AuthenticateUserInput"
import { User } from "@/domain/entity/User"
import { UserRepository } from "@/domain/repository/UserRepository"
import { InMemoryUserRepository } from "@/infra/repository/in-memory/InMemoryUserRepository"

let userRepository:UserRepository

beforeAll(async ()=>{
    userRepository = new InMemoryUserRepository()
    const user = new User("userNameTest","123456")
    await userRepository.create(user)
    
})

test("Deve autenticar um usuário",async ()=>{
    const authenticaUser = new AuthenticateUser(userRepository)
    const input = new AuthenticateUserInput("userNameTest","123456")
    const output = await authenticaUser.execute(input)
    expect(output).toBeTruthy()
})

test("Não autenticar um usuário com userName que nao existe",async ()=>{
    const authenticaUser = new AuthenticateUser(userRepository)
    const input = new AuthenticateUserInput("userNameTest2","123456")
    expect(async ()=> await authenticaUser.execute(input)).rejects.toThrow("User not found")
})

test("Não autenticar um usuário com senha inválida",async ()=>{
    const authenticaUser = new AuthenticateUser(userRepository)
    const input = new AuthenticateUserInput("userNameTest","invalidpassword")
    expect(async ()=> await authenticaUser.execute(input)).rejects.toThrow("Invalid credentials")
})