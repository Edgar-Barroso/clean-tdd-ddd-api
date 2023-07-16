import { UserRepository } from "@/domain/repository/UserRepository";
import { DeleteUserInput } from "./DeleteUserInput";
import { User } from "@/domain/entity/User";

export class DeleteUser{
    constructor(readonly userRepository:UserRepository){}

    async execute(input:DeleteUserInput):Promise<void>{
        const user = await this.userRepository.findById(input.userId)
        if(!user) throw new Error("User not found")

        await this.userRepository.delete(user)
    }
}