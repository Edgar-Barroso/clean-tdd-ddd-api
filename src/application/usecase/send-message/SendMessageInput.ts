export class SendMessageInput {
  constructor(
    readonly content: string,
    readonly userId: string,
    readonly sessionId: string
  ) {}

  isValid() {
    return this.content && this.userId && this.sessionId;
  }
}
