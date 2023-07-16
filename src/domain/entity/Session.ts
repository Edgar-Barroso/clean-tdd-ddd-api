import { Message } from "./Message"
import { UniqueEntityID } from "./value_object/UniqueEntityId"

export class Session{

    private id: UniqueEntityID
    userIds: string[]
    
    constructor(readonly name:string,id?:string){
        this.id = new UniqueEntityID(id)
        this.userIds = []
    }

    removeUserId(userId: string) {
        this.userIds = this.userIds.filter(item=>!(item===userId))
    }

    addUserId(userId:string){
        this.userIds.push(userId)
    
    }
    getId(){
        return this.id.getValue()
    }

}