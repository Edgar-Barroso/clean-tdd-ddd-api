import { MessageRepository } from "@/domain/repository/MessageRepository";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { UserRepository } from "@/domain/repository/UserRepository";
import { SendMessageInput } from "./SendMessageInput";
import { Message } from "@/domain/entity/Message";
import { UserNotFoundError } from "@/application/errors/UserNotFoundError";
import { SessionNotFoundError } from "@/application/errors/SessionNotFoundError";

export class SendMessage {
  constructor(
    readonly sessionRepository: SessionRepository,
    readonly messageRepository: MessageRepository,
    readonly userRepository: UserRepository
  ) {}

  async execute(input:SendMessageInput):Promise<void>{
    const user = await this.userRepository.findById(input.userId)
    if(!user) throw new UserNotFoundError()
    const session = await this.sessionRepository.findById(input.sessionId)
    if(!session) throw new SessionNotFoundError()
    const message = new Message(input.content,user.getId(),session.getId())
    await this.messageRepository.create(message)
  }
}
