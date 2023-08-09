import { InMemoryRepositoryFactory } from "@/infra/factory/InMemoryRepositoryFactory"
import { User } from "@/domain/entity/User"
import { Session } from "@/domain/entity/Session"
import { HttpRequest } from "@/presentation/core/HttpRequest"
import { Message } from "@/domain/entity/Message"
import { FetchMessagesSessionController } from "@/presentation/controller/http/FetchMessagesSessionController"

let repositoryFactory:InMemoryRepositoryFactory
let fetchMessagesSessionController:FetchMessagesSessionController

beforeEach(()=>{
    repositoryFactory = new InMemoryRepositoryFactory()
    fetchMessagesSessionController = new FetchMessagesSessionController(repositoryFactory)
})


test("Deve retornar todas as mensagens",async ()=>{
    const httpRequest:HttpRequest = {
        params:{
            sessionId:"session-1"
        },
        user:{
            sub:"id-user-01",
        }
    }

    await repositoryFactory.createSessionRepository().create(new Session("Sessao1","session-1"))
    await repositoryFactory.createUserRepository().create(new User("EdgarBarroso","123456","id-user-01"))
    await repositoryFactory.createMessageRepository().create(new Message("Hello World","id-user-01","session-1"))

    const httpResponse = await fetchMessagesSessionController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(200)

})
