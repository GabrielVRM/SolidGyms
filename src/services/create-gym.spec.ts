import { beforeEach, describe, expect, it, test } from "vitest";

import { InMemoryCacheGymsRepository } from "@/repository/in-memory-cache/in-memory-cache-gyms.js";
import { GymServices } from "./create-gym.js";
import { Prisma, type Gym } from "@prisma/client";

// testes unitarios

let gymsRepository: InMemoryCacheGymsRepository;
let sut: GymServices;
describe("register services", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryCacheGymsRepository();
    sut = new GymServices(gymsRepository);
  });
  it("should be able to create gym", async () => {
    const gym = await sut.execute({
      title: "smart-fit unidade teste",
      description: null,
      phone: "9886431855",
      latitude: -23.7442673,
      longitude: -46.7072269,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
