import type { UsersRepository } from "@/repository/users-repository.js";
import { UsersAlreadyExistsError } from "./errors/user-already-exists-error.js";
import { UsersCredentialsError } from "./errors/user-credentials-error.js";
import { compareSync } from "bcryptjs";
import type { User } from "@prisma/client";

interface AuthenticateServicesRequest {
  email: string;
  password: string;
}
interface AuthenticateServicesResponse {
  user: User;
}
export class AuthenticateServices {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateServicesRequest): Promise<AuthenticateServicesResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UsersCredentialsError();
    }

    const doesPasswordMatches = compareSync(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new UsersCredentialsError();
    }
    return {
      user,
    };
  }
}
