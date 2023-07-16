
import { Message } from "@/domain/entity/Message";
import { MessageRepository } from "@/domain/repository/MessageRepository";


export class InMemoryMessageRepository implements MessageRepository {
    items:Message[]

    constructor(){
        this.items=[]
    }

    async findById(messageId: string): Promise<Message | undefined> {
        return this.items.find(item=>item.getId()===messageId)
    }
    async findBySession(sessionId: string): Promise<Message[]> {
        return this.items.filter(item=>item.getSessionId()===sessionId)
    }
    async create(message: Message): Promise<void> {
        this.items.push(message)
    }
    async delete(message: Message): Promise<void> {
        this.items = this.items.filter(item=>(item.getId()!==message.getId()))
    }
}
