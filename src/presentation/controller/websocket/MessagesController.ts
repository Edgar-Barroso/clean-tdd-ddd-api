import { SendMessage } from "@/application/usecase/send-message/SendMessage";
import { SendMessageInput } from "@/application/usecase/send-message/SendMessageInput";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { MessageRepository } from "@/domain/repository/MessageRepository";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { UserRepository } from "@/domain/repository/UserRepository";
import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";

interface RoomUser {
  socket_id: string;
  socket: WebSocket;
  userId: string;
  roomId: string;
}

let users: RoomUser[] = [];

export class MessagesController {
  messageRepository: MessageRepository;
    sessionRepository: SessionRepository;
    userRepository: UserRepository;
  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.sessionRepository = repositoryFactory.createSessionRepository()
    this.messageRepository = repositoryFactory.createMessageRepository()
    this.userRepository = repositoryFactory.createUserRepository()

  }

  async execute(connection: SocketStream, req: FastifyRequest) {
    connection.socket.on("message", async (message: Buffer) => {
      const data = JSON.parse(message.toString());
      if (data.event === "select_room") {
        const { roomId } = data.payload;
        //@ts-ignore
        const userId = req.user.sub
        const userInRoom = users.find(
          (user) => user.userId === userId && user.roomId === roomId
        );
        if (userInRoom) {
          userInRoom.socket_id = req.id;
          userInRoom.socket = connection.socket;
        } else {
          users.push({
            roomId,
            userId,
            socket: connection.socket,
            socket_id: req.id,
          });
        }
      }
      if (data.event === "message") {
        const sendMessageUseCase = new SendMessage(this.sessionRepository,this.messageRepository,this.userRepository)
        const { roomId, content } = data.payload;
        //@ts-ignore
        const userId = req.user.sub
        const input = new SendMessageInput(userId,roomId,content)
        await sendMessageUseCase.execute(input)
        const user = await this.userRepository.findById(userId)
        const userName = user?.getUserName()
        users.forEach((user) => {
          const message = {
            event: "message",
            payload: {
              content,
              userName,
              roomId,
            },
          };
          if (user.roomId === roomId) user.socket.send(JSON.stringify(message));
        });
      }
      if (data.event === "leave_room") {
        const { roomId } = data.payload;
        //@ts-ignore
        const userId = req.user.sub
        users = users.filter(
          (user) => !(user.roomId === roomId && user.userId === userId)
        );
      }
    });
  }
}
