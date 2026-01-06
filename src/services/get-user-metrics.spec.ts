import { InMemoryCacheCheckInRepository } from "@/repository/in-memory-cache/in-memory-cache-checkin-repository.js";
import { expect, describe, it, beforeEach } from "vitest";
import { GetUserMetricsServices } from "./get-user-metrics.js";
import { any } from "zod";

let checkInsRepository: InMemoryCacheCheckInRepository;
let sut: GetUserMetricsServices;

describe("Get User Check-in metrics Sarvices", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCacheCheckInRepository();
    sut = new GetUserMetricsServices(checkInsRepository);

    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }
  });

  it("should be able to fetch check-in history", async () => {
    const { metrics } = await sut.execute({
      userId: "user-01",
    });

    expect(metrics).toBe(22);
  });
});
