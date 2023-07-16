import { UserRepository } from "@/domain/repository/UserRepository";
import { CreateUserInput } from "./CreateUserInput";
import { User } from "@/domain/entity/User";

export class CreateUser{
    constructor(readonly userRepository:UserRepository){}

    async execute(input:CreateUserInput):Promise<void>{
        const user = new User(input.userName,input.password)
        const existsUser = await this.userRepository.findByUserName(input.userName)
        if(existsUser) throw new Error("User already exists")
        await this.userRepository.create(user)
    }
}