import { CreateUserController } from "@/presentation/controller/CreateUserController"
import { InMemoryRepositoryFactory } from "@/infra/factory/InMemoryRepositoryFactory"

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

    const httpResponse = await createUserController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(409)
    expect(httpResponse.body).toEqual({error: 'User already exists'})


})





test("Não deve criar um usuário com sucesso userName inválido",async ()=>{
    const httpRequest = {
        body:{
            userName:"Edgar Barroso",
            password:"123456"
        }

    }
    const httpResponse = await createUserController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({error: 'Invalid userName'})
    
    
})


test("Não deve criar um usuário com sucesso senha inválida",async ()=>{
    const httpRequest = {
        body:{
            userName:"EdgarBarroso",
            password:"123"
        }

    }
    const httpResponse = await createUserController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({error: 'Invalid password'})

})

test("Não deve criar um usuário com body errado (userName)",async ()=>{
    const httpRequest = {
        body:{
            password:"123456"
        }

    }
    const httpResponse = await createUserController.execute(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({error: 'Missing params'})

})


test("Não deve criar um usuário com body errado (password)",async ()=>{
    const httpRequest = {
        body:{
            userName:"EdgarBarroso",
        }

    }
    const httpResponse = await createUserController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({error: 'Missing params'})


})