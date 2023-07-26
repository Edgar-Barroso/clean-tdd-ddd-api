import { AuthenticateUserController } from "@/presentation/controller/AuthenticateUserController"
import { InMemoryRepositoryFactory } from "@/infra/factory/InMemoryRepositoryFactory"
import { User } from "@/domain/entity/User"

let repositoryFactory:InMemoryRepositoryFactory
let authenticateUserController:AuthenticateUserController

beforeEach(async ()=>{
    repositoryFactory = new InMemoryRepositoryFactory()
    authenticateUserController = new AuthenticateUserController(repositoryFactory)
    await repositoryFactory.createUserRepository().create(new User("EdgarBarroso","123456"))
})

test("Deve authenticar um usuário com sucesso",async ()=>{
    const httpRequest = {
        body:{
            userName:"EdgarBarroso",
            password:"123456"
        }

    }
    const httpResponse = await authenticateUserController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.token).toBeTruthy()

})
test("Não deve authenticar um usuário com userName que nao existe",async ()=>{
    const httpRequest = {
        body:{
            userName:"UserNameNotExists",
            password:"123456"
        }

    }
    const httpResponse = await authenticateUserController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual({error:"Not found"})
    expect(httpResponse.token).toBeFalsy()

})

test("Não deve authenticar um usuário com password errada",async ()=>{
    const httpRequest = {
        body:{
            userName:"EdgarBarroso",
            password:"654321"
        }

    }
    const httpResponse = await authenticateUserController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual({error:"Unauthorized"})
    expect(httpResponse.token).toBeFalsy()


})

test("Não deve criar um usuário com body errado (userName)",async ()=>{
    const httpRequest = {
        body:{
            password:"123456"
        }

    }
    const httpResponse = await authenticateUserController.execute(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({error: 'Missing params'})
    expect(httpResponse.token).toBeFalsy()


})


test("Não deve criar um usuário com body errado (password)",async ()=>{
    const httpRequest = {
        body:{
            userName:"EdgarBarroso",
        }

    }
    const httpResponse = await authenticateUserController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({error: 'Missing params'})
    expect(httpResponse.token).toBeFalsy()



})