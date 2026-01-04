import { prisma } from "@/lib/prisma.js";
import { PrismaUsersRepositorys } from "@/repository/prisma/users-repository.js";
import type { UsersRepository } from "@/repository/users-repository.js";
import bcrypt from "bcryptjs";
import { UsersAlreadyExistsError } from "./errors/user-already-exists-error.js";
import type { User } from "@prisma/client";

interface RegisterServicesRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterServicesResponse {
  user: User;
}

export class RegisterServices {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
  }: RegisterServicesRequest): Promise<RegisterServicesResponse> {
    const password_hash = bcrypt.hashSync(password, 10);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UsersAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
