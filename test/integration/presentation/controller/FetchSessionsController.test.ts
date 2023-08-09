import { InMemoryRepositoryFactory } from "@/infra/factory/InMemoryRepositoryFactory"
import { User } from "@/domain/entity/User"
import { Session } from "@/domain/entity/Session"
import { HttpRequest } from "@/presentation/core/HttpRequest"
import { FetchSessionsController } from "@/presentation/controller/http/FetchSessionsController"

let repositoryFactory:InMemoryRepositoryFactory
let fetchSessionsController:FetchSessionsController

beforeEach(()=>{
    repositoryFactory = new InMemoryRepositoryFactory()
    fetchSessionsController = new FetchSessionsController(repositoryFactory)
})


test("Deve retornar a primeira pagina",async ()=>{
    const httpRequest:HttpRequest = {
        params:{
            page:1
        },
        user:{
            sub:"id-user-01",
        }
    }
    await repositoryFactory.createSessionRepository().create(new Session("Session1"))

    const httpResponse = await fetchSessionsController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.sessions).toHaveLength(1)

})

test("Deve retornar a segunda pagina",async ()=>{
    const httpRequest:HttpRequest = {
        params:{
            page:2
        },
        user:{
            sub:"id-user-01",
        }
    }
    for(let i=0;i<25;i++){
        await repositoryFactory.createSessionRepository().create(new Session(`Session ${i+1}`,))
    }

    const httpResponse = await fetchSessionsController.execute(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.sessions).toHaveLength(5)

})
