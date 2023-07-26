import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { Controller } from "../core/Controller";
import { HttpRequest } from "../core/HttpRequest";
import { HttpResponse } from "../core/HttpResponse";
import { UserRepository } from "@/domain/repository/UserRepository";
import { AuthenticateUser } from "@/application/usecase/authenticade-user/AuthenticateUser";
import { AuthenticateUserInput } from "@/application/usecase/authenticade-user/AuthenticateUserInput";
import { badRequest, conflict, internalServerError ,created, unauthorized, notFound, ok} from "../helpers/http-helper";
import { UserAlreadyExistsError } from "@/application/errors/UserAlreadyExistsError";
import { ValidationError } from "@/domain/entity/errors/ValidationError";
import { InvalidCredentialsError } from "@/application/errors/InvalidCredentialsError";
import { UserNotFoundError } from "@/application/errors/UserNotFoundError";

export class AuthenticateUserController implements Controller{
    userRepository:UserRepository
    constructor(repositoryFactory:RepositoryFactory){
        this.userRepository = repositoryFactory.createUserRepository()
    }

    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const authenticateUser = new AuthenticateUser(this.userRepository)
        const input = new AuthenticateUserInput(httpRequest.body.userName,httpRequest.body.password)
        if (!input.isValid()) return badRequest({error:"Missing params"})

        try{
            const { userId } = await authenticateUser.execute(input)
            return ok(
                {},
                {token: {
                    header:{},
                    payload: { 
                      sign: {sub:userId, expiresIn: '7d' } } 
                    }
                }
                )
        }catch(error){
            
            if(error instanceof InvalidCredentialsError){
                return unauthorized()
            }
            if(error instanceof UserNotFoundError){
                return notFound()
            }
            else{
                return internalServerError()
            }
            
        }
    }

}