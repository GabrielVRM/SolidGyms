import { PrismaUsersRepositorys } from "@/repository/prisma/users-repository.js";
import { GetProfileService } from "../get-user-profile.js";

export function makeGetProfile() {
  const prismaRepository = new PrismaUsersRepositorys();
  const profileGetUser = new GetProfileService(prismaRepository);

  return profileGetUser;
}
