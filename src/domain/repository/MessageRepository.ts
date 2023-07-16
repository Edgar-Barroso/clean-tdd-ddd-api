import { Message } from "../entity/Message";

export interface MessageRepository{
    findById(messageId:string):Promise<Message | undefined>
    findBySession(sessionId:string):Promise<Message[]>
    create(message:Message):Promise<void>
    delete(message:Message):Promise<void>
}