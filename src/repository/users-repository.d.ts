import type { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findByUser(user_id: string);
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
