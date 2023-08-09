export class FetchMessagesSessionOutput{
    constructor(readonly messages:{userName:string,content:string,date:Date}[]){}
}