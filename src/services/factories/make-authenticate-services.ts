import { PrismaUsersRepositorys } from "@/repository/prisma/users-repository.js";
import { AuthenticateServices } from "../authenticate.js";

export function makeAuthenticateServices() {
  const prismaUsersRepositorys = new PrismaUsersRepositorys();
  const authenticateServices = new AuthenticateServices(prismaUsersRepositorys);
  return authenticateServices;
}
