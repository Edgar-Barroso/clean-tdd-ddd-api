import { InMemoryRepositoryFactory } from "@/infra/factory/InMemoryRepositoryFactory"
import { CreateSessionController } from "@/presentation/controller/http/CreateSessionController"
import { HttpRequest } from "@/presentation/core/HttpRequest"

let repositoryFactory:InMemoryRepositoryFactory
let createSessionUserController:CreateSessionController

beforeEach(async ()=>{
    repositoryFactory = new InMemoryRepositoryFactory()
    createSessionUserController = new CreateSessionController(repositoryFactory)
})

test("Deve criar uma sala(Sessão) com sucesso",async ()=>{
    const httpRequest:HttpRequest = {
        body:{
            name:"Sala - 1"
        }
    }
    const input = await createSessionUserController.execute(httpRequest)
    expect(input.statusCode).toBe(201)
})
