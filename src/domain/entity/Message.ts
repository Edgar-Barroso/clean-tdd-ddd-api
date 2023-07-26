import { UniqueEntityID } from "./value_object/UniqueEntityId";

export class Message {
  private id: UniqueEntityID;

  constructor(
    readonly content: string,
    readonly userId: string,
    readonly sessionId: string,
    readonly date: Date = new Date(),
    id?: string
  ) {
    this.id = new UniqueEntityID(id);
  }

  getId() {
    return this.id.getValue();
  }

  getDate() {
    return this.date;
  }
  getSessionId() {
    return this.sessionId
}
}
