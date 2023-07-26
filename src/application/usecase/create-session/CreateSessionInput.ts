export class CreateSessionInput {
    constructor(readonly name:string){
    }
    isValid() {
        return this.name
    }

}