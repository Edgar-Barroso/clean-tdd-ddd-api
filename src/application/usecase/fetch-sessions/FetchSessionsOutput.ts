export class FetchSessionsOutput {
  constructor(readonly sessions: { name: string; id: string }[]) {}
}
