import { CreateUser } from "@/application/usecase/create-user/CreateUser"
import { CreateUserInput } from "@/application/usecase/create-user/CreateUserInput"
import { User } from "@/domain/entity/User"
import { InMemoryUserRepository } from "@/infra/persistence/in-memory/InMemoryUserRepository"


test("Deve criar um usuário",async ()=>{
    const userRepository = new InMemoryUserRepository()
    const createUser = new CreateUser(userRepository)
    const input = new CreateUserInput("UserNameTest","123456")
    await createUser.execute(input)
    expect(userRepository.items).toHaveLength(1) 
})


test("Deve falhar ao tentar criar um usuário com userName ja existente",async ()=>{
    const userRepository = new InMemoryUserRepository()
    userRepository.items.push(new User("UserNameTest","123456"))
    const createUser = new CreateUser(userRepository)
    const input = new CreateUserInput("UserNameTest","654321")
    expect(async()=>await createUser.execute(input)).rejects.toThrow("User already exists")
})