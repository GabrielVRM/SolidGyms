import type { UsersRepository } from "@/repository/users-repository.js";
import { UsersCredentialsError } from "./errors/user-credentials-error.js";
import { compareSync } from "bcryptjs";
import type { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/user_not_found.js";

interface GetProfileServiceRequest {
  user_id: string;
}
interface GetProfileServiceResponse {
  user: User;
}
export class GetProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    user_id,
  }: GetProfileServiceRequest): Promise<GetProfileServiceResponse> {
    const user = await this.usersRepository.findByUser(user_id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return user;
  }
}
