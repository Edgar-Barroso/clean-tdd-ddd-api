import { UserRepository } from "@/domain/repository/UserRepository";
import { User } from "@/domain/entity/User";
import { UpdateUserInput } from "./UpdateUserInput";
import { UniqueEntityID } from "@/domain/entity/value_object/UniqueEntityId";

export class UpdateUser{
    constructor(readonly userRepository:UserRepository){}

    async execute(input:UpdateUserInput):Promise<void>{
        const user = await this.userRepository.findById(input.userId)
        if(!user) throw new Error("User not found")
        
        const newUser = new User(input.userName,input.password,input.userId)
        await this.userRepository.update(newUser)
    }
}