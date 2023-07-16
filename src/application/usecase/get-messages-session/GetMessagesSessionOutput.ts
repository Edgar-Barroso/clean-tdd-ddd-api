export class GetMessagesSessionOutput{
    constructor(readonly messages:{userName:string,content:string,date:Date}[]){}
}