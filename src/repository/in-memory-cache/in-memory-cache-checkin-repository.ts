import type { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import type { CheckInsRepository } from "../check-ins.js";
import dayjs from "dayjs";

export class InMemoryCacheCheckInRepository implements CheckInsRepository {
  public items: CheckIn[] = [];
  async findManyCheckInsByUserId(
    userId: string,
    page: number
  ): Promise<CheckIn[]> {
    const itemsOfUser = this.items.filter((item) => item.user_id === userId);
    return itemsOfUser.slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string) {
    const metricsCheckIns = this.items.filter(
      (item) => item.user_id === userId
    );

    return metricsCheckIns.length;
  }

  async findByCheckIn(userId: string, date: Date) {
    const checkInOnSameDate = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at).format("YYYY-MM-DD");
      const isOnSameDate = checkInDate === dayjs(date).format("YYYY-MM-DD");

      return checkin.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }
    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };
    this.items.push(checkIn);
    return checkIn;
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id);

    if (!checkIn) return null;
    return checkIn;
  }
  async save(checkIn: CheckIn) {
    // verificar mais tarde!! o meu this.items ja vem co o checkin validade, a pricipio esse metodo não serve para salvar o checkin recebido e validado
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);
    if (checkInIndex >= 0) this.items[checkInIndex] = checkIn;

    return checkIn;
  }
}
