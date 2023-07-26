export class AuthenticateUserInput{
    constructor(readonly userName:string,readonly password:string){}

    isValid(){
        return this.userName && this.password
    }
}