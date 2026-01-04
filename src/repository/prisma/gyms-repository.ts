import type { Prisma, Gym } from "@prisma/client";
import type { GeolocationParams, GymsRepository } from "../gyms.js";
import { prisma } from "@/lib/prisma.js";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }
  async findByGyms(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }
  async searchMany(search: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      take: 20,
    });
    return gyms;
  }
  async findByGymsNearby({ latitude, longitude }: GeolocationParams) {
    const gyms: Gym[] = await prisma.$queryRaw`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
      `;

    return gyms;
  }
}
