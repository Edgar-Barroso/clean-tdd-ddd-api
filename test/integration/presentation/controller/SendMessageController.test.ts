import { SendMessageController } from "@/presentation/controller/SendMessageController"
import { InMemoryRepositoryFactory } from "@/infra/factory/InMemoryRepositoryFactory"
import { User } from "@/domain/entity/User"
import { Session } from "@/domain/entity/Session"

let repositoryFactory:InMemoryRepositoryFactory
let sendMessageController:SendMessageController

beforeEach(()=>{
    repositoryFactory = new InMemoryRepositoryFactory()
    sendMessageController = new SendMessageController(repositoryFactory)
})


test("Deve enviar uma messagem com sucesso",async ()=>{
    const httpRequest = {
        body:{
            userId:"id-user-01",
            sessionId:"id-session-01",
            content:"Hello World!"
        }
    }
    await repositoryFactory.createUserRepository().create(new User("EdgarBarroso","123456","id-user-01"))
    await repositoryFactory.createSessionRepository().create(new Session("Session1","id-session-01"))

    const httpResponse = await sendMessageController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(200)

})

test("Não deve enviar uma messagem numa sessão que não existe",async ()=>{
    const httpRequest = {
        body:{
            userId:"id-user-01",
            sessionId:"id-session-01",
            content:"Hello World!"
        }
    }
    await repositoryFactory.createUserRepository().create(new User("EdgarBarroso","123456","id-user-01"))

    const httpResponse = await sendMessageController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(404)

})

test("Não deve enviar uma messagem com usuário que não existe",async ()=>{
    const httpRequest = {
        body:{
            userId:"id-user-01",
            sessionId:"id-session-01",
            content:"Hello World!"
        }
    }
    await repositoryFactory.createSessionRepository().create(new Session("Session1","id-session-01"))

    const httpResponse = await sendMessageController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(404)

})


test("Não deve enviar uma com body inválido",async ()=>{
    const httpRequest = {
        body:{
            userId:"id-user-01",
            content:"Hello World!"
        }
    }
    await repositoryFactory.createSessionRepository().create(new Session("Session1","id-session-01"))

    const httpResponse = await sendMessageController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(400)

})
