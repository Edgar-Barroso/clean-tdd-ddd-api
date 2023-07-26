import { User } from "@/domain/entity/User";
import { UserRepository } from "@/domain/repository/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  items: User[];

  constructor() {
    this.items = [];
  }

  async findByUserName(userName: string): Promise<User | undefined> {
    return this.items.find((item) => item.getUserName() === userName);
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.items.find((item) => item.getId() === userId);
  }

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async update(user: User): Promise<void> {
    const userIndex = this.items.findIndex(
      (item) => item.getId() === user.getId()
    );
    this.items[userIndex] = user;
  }

  async delete(user: User): Promise<void> {
    this.items = this.items.filter((item) => !(item.getId() === user.getId()));
  }
}
