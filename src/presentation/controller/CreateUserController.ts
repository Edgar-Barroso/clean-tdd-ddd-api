import { UserAlreadyExistsError } from "@/application/errors/UserAlreadyExistsError";
import { CreateUser } from "@/application/usecase/create-user/CreateUser";
import { CreateUserInput } from "@/application/usecase/create-user/CreateUserInput";
import { ValidationError } from "@/domain/entity/errors/ValidationError";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { badRequest, conflict, created, internalServerError} from "../helpers/http-helper";
import { Controller } from "../core/Controller";
import { HttpRequest } from "../core/HttpRequest";
import { HttpResponse } from "../core/HttpResponse";
import { UserRepository } from "@/domain/repository/UserRepository";

export class CreateUserController implements Controller{
    userRepository:UserRepository
    
    constructor(repositoryFactory:RepositoryFactory){
        this.userRepository = repositoryFactory.createUserRepository()
    }

    async execute(httpRequest:HttpRequest):Promise<HttpResponse>{
        const createUser = new CreateUser(this.userRepository)
        const input = new CreateUserInput(httpRequest.body.userName,httpRequest.body.password)
        if(!input.isValid()) return badRequest({error:"Missing params"})

        try{
            await createUser.execute(input)
            return created()

        }catch(error){
            
            if(error instanceof ValidationError){
                return badRequest({error:error.message})
            }
            if(error instanceof UserAlreadyExistsError){
                return conflict({error:error.message})
            }
            else{
                return internalServerError()
            }
            
        }
    }
    
}