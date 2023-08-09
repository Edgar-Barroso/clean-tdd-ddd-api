export class SendMessageInput {
  constructor(
    readonly userId: string,
    readonly sessionId: string,
    readonly content: string

  ) {}

  isValid() {
    return this.content && this.userId && this.sessionId;
  }
}
