import { UserRepository } from "@/domain/repository/UserRepository";
import { AuthenticateUserInput } from "./AuhtenticateUserInput";
import { AuthenticateUserOutput } from "./AuhtenticateUserOutput";

export class AuthenticateUser{
    constructor(readonly userRepository:UserRepository){}

    async execute(input:AuthenticateUserInput):Promise<AuthenticateUserOutput>{

        const user = await this.userRepository.findByUserName(input.userName)
        if(!user) throw new Error("User not found")
        if(user.getPassword()!==input.password) throw new Error("Invalid credentials")
        const output = new AuthenticateUserOutput(user.getId(),user.getUserName())
        return output
    }
}