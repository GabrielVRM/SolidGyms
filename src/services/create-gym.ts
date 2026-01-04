import { prisma } from "@/lib/prisma.js";
import { PrismaUsersRepositorys } from "@/repository/prisma/users-repository.js";
import type { UsersRepository } from "@/repository/users-repository.js";
import bcrypt from "bcryptjs";
import { UsersAlreadyExistsError } from "./errors/user-already-exists-error.js";
import type { Gym } from "@prisma/client";
import type { GymsRepository } from "@/repository/gyms.js";
import type { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "node:crypto";

interface GymServicesRequest {
  title: string;
  description: string | null;
  latitude: number;
  longitude: number;
  phone: string;
}

interface GymServicesResponse {
  gym: Gym;
}

export class GymServices {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  }: GymServicesRequest) {
    const gym = this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });
    return gym;
  }
}
