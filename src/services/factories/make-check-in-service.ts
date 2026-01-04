import { PrismaCheckInsRepository } from "@/repository/prisma/check-ins-repository.js";
import { PrismaGymsRepository } from "@/repository/prisma/gyms-repository.js";
import { CheckinService } from "../check-in.js";

export function makeCheckInServices() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();

  const checkIn = new CheckinService(checkInsRepository, gymsRepository);

  return checkIn;
}
