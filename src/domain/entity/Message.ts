import { UniqueEntityID } from "./value_object/UniqueEntityId";

export class Message {
  private id: UniqueEntityID;
  private date: Date;

  constructor(
    readonly content: string,
    readonly userId: string,
    readonly sessionId: string,
    date: Date = new Date(),
    id?: string
  ) {
    this.id = new UniqueEntityID(id);
    this.date = date ?? new Date();
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
