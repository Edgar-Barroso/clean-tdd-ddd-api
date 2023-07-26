import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { MessageRepository } from "@/domain/repository/MessageRepository";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { UserRepository } from "@/domain/repository/UserRepository";
import { InMemoryUserRepository } from "../repository/in-memory/InMemoryUserRepository";
import { InMemorySessionRepository } from "../repository/in-memory/InMemorySessionRepository";
import { InMemoryMessageRepository } from "../repository/in-memory/InMemoryMessageRepository";

export class InMemoryRepositoryFactory implements RepositoryFactory{
    userRepository: any;
    sessionRepository: InMemorySessionRepository;
    messageRepository: InMemoryMessageRepository;

    constructor(){
        this.userRepository = new InMemoryUserRepository()
        this.sessionRepository = new InMemorySessionRepository()
        this.messageRepository = new InMemoryMessageRepository()
    }

    createUserRepository(): UserRepository {
        return this.userRepository
    }
    createSessionRepository(): SessionRepository {
        return this.sessionRepository
    }
    createMessageRepository(): MessageRepository {
        return this.messageRepository
    }

}