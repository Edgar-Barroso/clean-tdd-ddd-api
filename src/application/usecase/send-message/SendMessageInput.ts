export class SendMessageInput {
  constructor(
    readonly content: string,
    readonly userId: string,
    readonly sessionId: string
  ) {}
}
