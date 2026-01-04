import { prisma } from "@/lib/prisma.js";
import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../users-repository.js";

export class PrismaUsersRepositorys implements UsersRepository {
  async findByUser(user_id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
  async findByEmail(email: string) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return userWithSameEmail;
  }
}
