import { UserAlreadyExistsError } from "@/application/errors/UserAlreadyExistsError";
import { CreateUser } from "@/application/usecase/create-user/CreateUser";
import { CreateUserInput } from "@/application/usecase/create-user/CreateUserInput";
import { ValidationError } from "@/domain/entity/errors/ValidationError";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";

import { UserRepository } from "@/domain/repository/UserRepository";
import { Controller } from "@/presentation/core/Controller";
import { HttpRequest } from "@/presentation/core/HttpRequest";
import { HttpResponse } from "@/presentation/core/HttpResponse";

export class CreateUserController implements Controller{
    userRepository:UserRepository
    
    constructor(repositoryFactory:RepositoryFactory){
        this.userRepository = repositoryFactory.createUserRepository()
    }

    async execute(httpRequest:HttpRequest):Promise<HttpResponse>{
        const createUser = new CreateUser(this.userRepository)
        const input = new CreateUserInput(httpRequest.body.userName,httpRequest.body.password)
        await createUser.execute(input)
        return {statusCode:201}
        }
    }