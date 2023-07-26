import { MessageRepository } from "../repository/MessageRepository"
import { SessionRepository } from "../repository/SessionRepository"
import { UserRepository } from "../repository/UserRepository"

export interface RepositoryFactory{
    createUserRepository():UserRepository
    createSessionRepository():SessionRepository
    createMessageRepository():MessageRepository
}