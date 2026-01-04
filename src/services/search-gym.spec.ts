import { beforeEach, describe, expect, it, test } from "vitest";

import { InMemoryCacheGymsRepository } from "@/repository/in-memory-cache/in-memory-cache-gyms.js";
import { GymServices } from "./create-gym.js";
import { SearchServices } from "./search-gym.js";
import { InMemoryCacheCheckInRepository } from "@/repository/in-memory-cache/in-memory-cache-checkin-repository.js";

// testes unitarios

let gymsRepository: InMemoryCacheGymsRepository;
let gymServices: GymServices;

let sut: SearchServices;
describe("should be able to search many gyms", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryCacheGymsRepository();
    gymServices = new GymServices(gymsRepository);
    sut = new SearchServices(gymsRepository);
  });
  it("should be able to create gym", async () => {
    for (let i = 1; i <= 3; i++) {
      await gymServices.execute({
        title: `smart-fit-${i}`,
        description: null,
        phone: "9886431855",
        latitude: -23.7442673,
        longitude: -46.7072269,
      });
    }
    const gym = await sut.execute({
      search: "smart-fit-1",
      page: 1,
    });

    console.log(gym);
    expect(gym).toEqual({
      gyms: [expect.objectContaining({ title: "smart-fit-1" })],
    });
  });

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    }

    const { gyms } = await sut.execute({
      search: "JavaScript",
      page: 2,
    });
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
