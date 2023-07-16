import { User } from "../entity/User"

export interface UserRepository{
    findByUserName(userName: string):Promise<User | undefined>
    findById(userId: string):Promise<User | undefined>
    create(user:User):Promise<void>
    update(user:User):Promise<void>
    delete(user:User):Promise<void>

}