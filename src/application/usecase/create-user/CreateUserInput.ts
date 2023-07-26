export class CreateUserInput{
    constructor(readonly userName:string,readonly password:string){
        
    }

    isValid(){
        return (this.password && this.userName)
    }
}