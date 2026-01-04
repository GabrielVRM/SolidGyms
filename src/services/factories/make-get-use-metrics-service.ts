import { PrismaCheckInsRepository } from "@/repository/prisma/check-ins-repository.js";
import { GetUserMetricsServices } from "../get-user-metrics.js";

export function makeGetUserMetricsServices() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const userMetrics = new GetUserMetricsServices(checkInsRepository);

  return userMetrics;
}
