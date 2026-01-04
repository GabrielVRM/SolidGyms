import type { CheckIn, Prisma, User } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  save(checkIn: CheckIn): Promise<CheckIn>;
  findManyCheckInsByUserId(userId: string, page?: number): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  findByCheckIn(userId: string, date: Date): Promise<CheckIn | null>;
  findById(id: string): Promise<CheckIn | null>;
}
