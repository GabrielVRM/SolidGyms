import type { GymsRepository } from "@/repository/gyms.js";
import type { Gym } from "@prisma/client";

interface FetchNearbyServiceRequest {
  userLongitude: number;
  userLatitude: number;
}
interface FetchNearbyServiceResponse {
  gyms: Gym[];
}
export class FetchNearbyService {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    userLongitude,
    userLatitude,
  }: FetchNearbyServiceRequest): Promise<FetchNearbyServiceResponse> {
    const gyms = await this.gymsRepository.findByGymsNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
