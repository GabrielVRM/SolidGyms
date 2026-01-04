import { Prisma, type CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "../check-ins.js";
import { prisma } from "@/lib/prisma.js";
import { check } from "zod";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
  async save(checkIn: CheckIn) {
    const data = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });

    return data;
  }
  async findManyCheckInsByUserId(userId: string, page?: number) {
    const chekIns = await prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 20,
      // skip: (page ? page : 1 - 1) * 20,
    });
    return chekIns;
  }

  async countByUserId(userId: string) {
    const countCheckIn = await prisma.checkIn.count({
      where: { user_id: userId },
    });

    return countCheckIn;
  }
  async findByCheckIn(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id },
    });

    return checkIn;
  }
}
