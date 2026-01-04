import { PrismaGymsRepository } from "@/repository/prisma/gyms-repository.js";
import { SearchServices } from "../search-gym.js";

export function makeSearchGymsServices() {
  const gymsRepository = new PrismaGymsRepository();
  const searchGyms = new SearchServices(gymsRepository);

  return searchGyms;
}
