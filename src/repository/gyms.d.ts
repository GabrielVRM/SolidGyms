import type { Gym, Prisma, User } from "@prisma/client";

export interface GeolocationParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findByGyms(id: string): Promise<Gym | null>;
  searchMany(search: string, page: number): Promise<Gym[]>;
  findByGymsNearby({ params }: GeolocationParams): Promise<Gym[]>;
}
