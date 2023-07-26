import { UserRepository } from "@/domain/repository/UserRepository";
import { CreateUserInput } from "./CreateUserInput";
import { User } from "@/domain/entity/User";
import { UserAlreadyExistsError } from "@/application/errors/UserAlreadyExistsError";

export class CreateUser{
    constructor(readonly userRepository:UserRepository){
        
    }

    async execute(input:CreateUserInput):Promise<void>{
        const user = new User(input.userName,input.password)
        const existsUser = await this.userRepository.findByUserName(input.userName)
        if(existsUser) throw new UserAlreadyExistsError()
        await this.userRepository.create(user)
    }
}