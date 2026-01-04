import { PrismaGymsRepository } from "@/repository/prisma/gyms-repository.js";
import { FetchNearbyService } from "../fetch-nearby-gyms.js";

export function makeFetchNearbyGymsServices() {
  const gymsRepository = new PrismaGymsRepository();
  const nearbyGyms = new FetchNearbyService(gymsRepository);

  return nearbyGyms;
}
