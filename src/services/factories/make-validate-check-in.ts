import { PrismaCheckInsRepository } from "@/repository/prisma/check-ins-repository.js";
import { ValidateCheckInService } from "../validate.check-in.js";

export function makeValidateCheckInServices() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const validateCheckIn = new ValidateCheckInService(checkInsRepository);

  return validateCheckIn;
}
