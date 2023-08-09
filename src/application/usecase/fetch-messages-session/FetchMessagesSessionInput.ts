export class FetchMessagesSessionInput{
    constructor(readonly userId:string,readonly sessionId:string){}
    isValid() {
        return this.userId && this.sessionId
    }
}