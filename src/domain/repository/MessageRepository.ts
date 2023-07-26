import { Message } from "../entity/Message";

export interface MessageRepository{
    findBySession(sessionId:string):Promise<Message[]>
    create(message:Message):Promise<void>
    delete(message:Message):Promise<void>
}