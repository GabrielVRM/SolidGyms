import { PrismaGymsRepository } from "@/repository/prisma/gyms-repository.js";
import { GymServices } from "../create-gym.js";

export function makeCreateGymServices() {
  const gymsRepository = new PrismaGymsRepository();
  const createGym = new GymServices(gymsRepository);

  return createGym;
}
