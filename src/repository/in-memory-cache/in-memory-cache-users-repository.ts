import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../users-repository.js";
import { randomUUID } from "node:crypto";

export class InMemoryCacheUsersRepository implements UsersRepository {
  findByUser(user_id: string) {
    console.log("buscando o user in memory database ");

    const user = this.items.find((user) => user.id === user_id);
    if (!user) {
      return null;
    }
    return { user };
  }
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    console.log("criando user in memory database ");
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };
    this.items.push(user);
    return user;
  }
  async findByEmail(email: string) {
    console.log("verificando email in memory database ");
    const userWithSameEmail = this.items.find((user) => user.email === email);
    if (!userWithSameEmail) {
      return null;
    }
    return userWithSameEmail;
  }
}
