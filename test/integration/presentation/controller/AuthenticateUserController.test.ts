import { InMemoryRepositoryFactory } from "@/infra/factory/InMemoryRepositoryFactory"
import { User } from "@/domain/entity/User"
import { AuthenticateUserController } from "@/presentation/controller/http/AuthenticateUserController"

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
    expect(async () => await authenticateUserController.execute(httpRequest)).rejects.toBeInstanceOf(Error)

})

test("Não deve authenticar um usuário com password errada",async ()=>{
    const httpRequest = {
        body:{
            userName:"EdgarBarroso",
            password:"654321"
        }

    }
    expect(async () => await authenticateUserController.execute(httpRequest)).rejects.toBeInstanceOf(Error)
    

})

test("Não deve criar um usuário com body errado (userName)",async ()=>{
    const httpRequest = {
        body:{
            password:"123456"
        }

    }

    expect(async () => await authenticateUserController.execute(httpRequest)).rejects.toBeInstanceOf(Error)

})


test("Não deve criar um usuário com body errado (password)",async ()=>{
    const httpRequest = {
        body:{
            userName:"EdgarBarroso",
        }

    }
    expect(async () => await authenticateUserController.execute(httpRequest)).rejects.toBeInstanceOf(Error)


})