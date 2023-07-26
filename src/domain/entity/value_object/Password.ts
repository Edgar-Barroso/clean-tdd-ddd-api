import { ValidationError } from "../errors/ValidationError";

export class Password {
    value: string;
    constructor(value: string) {
      if (!this.isValid(value)) throw new ValidationError("Invalid password")
      this.value = value;
    }
  
    public getValue(){
      return this.value
    }
  
    private isValid(value: string): boolean {
      if (value.length < 6) return false;
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return false;
      return true;
    }
  }
  