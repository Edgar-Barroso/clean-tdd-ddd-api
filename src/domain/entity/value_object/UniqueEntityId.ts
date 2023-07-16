import { randomUUID } from 'crypto'

export class UniqueEntityID {
  private value: string

  getValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}
