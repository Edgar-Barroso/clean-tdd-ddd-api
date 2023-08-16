export class SendMessageInput {
  constructor(
    readonly userId: string,
    readonly sessionId: string,
    readonly content: string

  ) {}

}
