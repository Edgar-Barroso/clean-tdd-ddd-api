import { InMemoryRepositoryFactory } from "@/infra/factory/InMemoryRepositoryFactory"
import { CreateUserController } from "@/presentation/controller/http/CreateUserController"

let repositoryFactory:InMemoryRepositoryFactory
let createUserController:CreateUserController

beforeEach(()=>{
    repositoryFactory = new InMemoryRepositoryFactory()
    createUserController = new CreateUserController(repositoryFactory)
})

test("Deve criar um usuário com sucesso",async ()=>{
    const httpRequest = {
        body:{
            userName:"EdgarBarroso",
            password:"123456"
        }

    }
    const httpResponse = await createUserController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(201)

})
test("Não deve criar um usuário com userName já existente",async ()=>{
    const httpRequest = {
        body:{
            userName:"EdgarBarroso",
            password:"123456"
        }

    }
    await createUserController.execute(httpRequest)
    expect(async ()=>await createUserController.execute(httpRequest)).rejects.toBeInstanceOf(Error)
})


test("Não deve criar um usuário com sucesso userName inválido",async ()=>{
    const httpRequest = {
        body:{
            userName:"Edgar Barroso",
            password:"123456"
        }

    }
    expect(async ()=>await createUserController.execute(httpRequest)).rejects.toBeInstanceOf(Error)

    
})


test("Não deve criar um usuário com sucesso senha inválida",async ()=>{
    const httpRequest = {
        body:{
            userName:"EdgarBarroso",
            password:"123"
        }

    }
    expect(async ()=>await createUserController.execute(httpRequest)).rejects.toBeInstanceOf(Error)

})

