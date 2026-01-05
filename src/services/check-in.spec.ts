import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCacheCheckInRepository } from "@/repository/in-memory-cache/in-memory-cache-checkin-repository.js";
import { CheckinService } from "./check-in.js";
import type { GymsRepository } from "@/repository/gyms.js";
import { InMemoryCacheGymsRepository } from "@/repository/in-memory-cache/in-memory-cache-gyms.js";
import { randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";

let checkInsRepository: InMemoryCacheCheckInRepository;
let gymsRepository: GymsRepository;

let sut: CheckinService;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCacheCheckInRepository();
    gymsRepository = new InMemoryCacheGymsRepository();
    sut = new CheckinService(checkInsRepository, gymsRepository);

    const data = {
      id: "gym-01",
      description: "smart fit",
      latitude: Prisma.Decimal(-23.7442673),
      longitude: Prisma.Decimal(-46.7072269),
      phone: "11986431855",
      title: "Smart-Fit AV Teotonio Vilela",
    };
    await gymsRepository.create(data);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.7442673,
      userLongitude: -46.7072269,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.7442673,
      userLongitude: -46.7072269,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -23.7442673,
        userLongitude: -46.7072269,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to check in twice but in different days ", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.7442673,
      userLongitude: -46.7072269,
    });

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.7442673,
      userLongitude: -46.7072269,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    const data = {
      id: "gym-02",
      description: "smart fit",
      latitude: Prisma.Decimal(-23.7441996),
      longitude: Prisma.Decimal(-46.7071687),
      phone: "11986431855",
      title: "Smart-Fit Americanopolis",
    };
    await gymsRepository.create(data);
    expect(async () => {
      await sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -23.7354415,
        userLongitude: -46.710251,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
