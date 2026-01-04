import { Prisma, type Gym } from "@prisma/client";

import { randomUUID } from "node:crypto";
import type { GeolocationParams, GymsRepository } from "../gyms.js";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between.js";

export class InMemoryCacheGymsRepository implements GymsRepository {
  public items: Gym[] = [];
  async findByGymsNearby(params: GeolocationParams) {
    return this.items.filter((items) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: Number(items.latitude),
          longitude: Number(items.longitude),
        }
      );
      return distance < 10;
    });
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      phone: data.phone ?? null,
      title: data.title,
    };
    this.items.push(gym);

    return gym;
  }
  async findByGyms(id: string): Promise<Gym | null> {
    const searchGym = this.items.find((gym) => {
      return gym.id === id;
    });

    if (!searchGym) {
      return null;
    }
    return searchGym;
  }

  async searchMany(search: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(search))
      .slice((page - 1) * 20, page * 20);
  }
}
