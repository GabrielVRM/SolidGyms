import { PrismaCheckInsRepository } from "@/repository/prisma/check-ins-repository.js";
import { FetchUserCheckInsHistoryServices } from "../fetch-member-check-ins-history.js";

export function makeFetchUserCheckInsHistoryServices() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const checkInHistory = new FetchUserCheckInsHistoryServices(
    checkInsRepository
  );

  return checkInHistory;
}
