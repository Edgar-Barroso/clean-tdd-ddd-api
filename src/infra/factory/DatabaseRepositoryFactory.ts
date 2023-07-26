import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { MessageRepository } from "@/domain/repository/MessageRepository";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { UserRepository } from "@/domain/repository/UserRepository";
import { PrismaUserRepository } from "../repository/database/PrismaUserRepository";
import { PrismaSessionRepository } from "../repository/database/PrismaSessionRepository";
import { PrismaMessageRepository } from "../repository/database/PrismaMessageRepository";

export class PrismaRepositoryFactory implements RepositoryFactory{
    createUserRepository(): UserRepository {
        return new PrismaUserRepository()
    }
    createSessionRepository(): SessionRepository {
        return new PrismaSessionRepository()

    }
    createMessageRepository(): MessageRepository {
        return new PrismaMessageRepository()

    }

}