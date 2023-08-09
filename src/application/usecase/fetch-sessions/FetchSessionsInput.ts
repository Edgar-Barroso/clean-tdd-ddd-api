export class FetchSessionsInput{
    constructor(readonly page:number){}
    isValid() {
        return this.page
    }
}