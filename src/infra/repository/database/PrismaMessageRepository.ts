import { Message } from "@/domain/entity/Message";
import { MessageRepository } from "@/domain/repository/MessageRepository";
import { prisma } from "./Prisma";

export class PrismaMessageRepository implements MessageRepository {
  async deleteMany(): Promise<void> {
    await prisma.message.deleteMany()
}

  async findById(messageId: string): Promise<Message | undefined> {
    const persistenceMessage = await prisma.message.findUnique({
      where: { id: messageId },
    });
    if (!persistenceMessage) return undefined;
    const domainMessage = new Message(
      persistenceMessage.content,
      persistenceMessage.userId,
      persistenceMessage.sessionId,
      persistenceMessage.date,
      persistenceMessage.id
    );
    return domainMessage;
  }
  async findBySession(sessionId: string): Promise<Message[]> {
    const persistenceMessages = await prisma.message.findMany({
      where: {
        sessionId, // Condição de filtragem, substitua sessionId pelo valor desejado
      },
    });

    const domainMessages = persistenceMessages.map(
      (message) =>
        new Message(
          message.content,
          message.userId,
          message.sessionId,
          message.date,
          message.id
        )
    );

    return domainMessages;
  }
  async create(message: Message): Promise<void> {
    await prisma.message.create({
      data: {
        id: message.getId(),
        content: message.content,
        date: message.getDate(),
        sessionId: message.sessionId,
        userId: message.userId,
      },
    });
  }
  async delete(message: Message): Promise<void> {
    await prisma.message.delete({ where: { id: message.getId() } });
  }

  
}
