import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";

import { UserRepository } from "@/domain/repository/UserRepository";
import { AuthenticateUser } from "@/application/usecase/authenticade-user/AuthenticateUser";
import { AuthenticateUserInput } from "@/application/usecase/authenticade-user/AuthenticateUserInput";
import { UserAlreadyExistsError } from "@/application/errors/UserAlreadyExistsError";
import { ValidationError } from "@/domain/entity/errors/ValidationError";
import { InvalidCredentialsError } from "@/application/errors/InvalidCredentialsError";
import { UserNotFoundError } from "@/application/errors/UserNotFoundError";
import { Controller } from "@/presentation/core/Controller";
import { HttpRequest } from "@/presentation/core/HttpRequest";
import { HttpResponse } from "@/presentation/core/HttpResponse";

export class AuthenticateUserController implements Controller{
    userRepository:UserRepository
    constructor(repositoryFactory:RepositoryFactory){
        this.userRepository = repositoryFactory.createUserRepository()
    }

    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const authenticateUser = new AuthenticateUser(this.userRepository)
        const input = new AuthenticateUserInput(httpRequest.body.userName,httpRequest.body.password)

        const { userId } = await authenticateUser.execute(input)
        return {
            statusCode:200,
            body:{},
            token: {
                header:{},
                payload: { 
                    sign: {sub:userId, expiresIn: '7d' } } 
                }
            }
            
        }
    }
