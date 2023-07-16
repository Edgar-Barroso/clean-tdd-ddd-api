import { Password } from "./value_object/Password"
import { UniqueEntityID } from "./value_object/UniqueEntityId"
import { UserName } from "./value_object/UserName"

export class User{
    private id: UniqueEntityID
    private userName: UserName
    private password: Password
    
    constructor(userName:string, password:string,id?:string){
        this.userName = new UserName(userName)
        this.password = new Password(password)
        this.id = new UniqueEntityID(id)
    }

    getUserName():string {
        return this.userName.getValue()
    }
    
    getPassword(): string {
        return this.password.getValue()
    }

    getId(): string {
        return this.id.getValue()
    }
}