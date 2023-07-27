import { UniqueEntityID } from "./value_object/UniqueEntityId"

export class Session{

    private id: UniqueEntityID
    
    constructor(readonly name:string,id?:string){
        this.id = new UniqueEntityID(id)
    }

    getId(){
        return this.id.getValue()
    }

}