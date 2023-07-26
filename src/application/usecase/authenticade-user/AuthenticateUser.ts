import { UserRepository } from "@/domain/repository/UserRepository";
import { AuthenticateUserInput } from "./AuthenticateUserInput";
import { AuthenticateUserOutput } from "./AuthenticateUserOutput";
import { UserNotFoundError } from "@/application/errors/UserNotFoundError";
import { InvalidCredentialsError } from "@/application/errors/InvalidCredentialsError";


export class AuthenticateUser{
    constructor(readonly userRepository:UserRepository){}

    async execute(input:AuthenticateUserInput):Promise<AuthenticateUserOutput>{

        const user = await this.userRepository.findByUserName(input.userName)
        if(!user) throw new UserNotFoundError()
        if(user.getPassword()!==input.password) throw new InvalidCredentialsError()
        const output = new AuthenticateUserOutput(user.getId())
        return output
    }
}