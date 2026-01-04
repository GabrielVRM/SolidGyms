import { PrismaUsersRepositorys } from "@/repository/prisma/users-repository.js";
import { RegisterServices } from "../register.js";

export function makeRegisterServices() {
  const prismaUsersRepositorys = new PrismaUsersRepositorys();
  const registerServices = new RegisterServices(prismaUsersRepositorys);

  return registerServices;
}
