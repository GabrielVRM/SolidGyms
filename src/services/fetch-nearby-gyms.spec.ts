import { beforeEach, describe, expect, it, test } from "vitest";

import { InMemoryCacheGymsRepository } from "@/repository/in-memory-cache/in-memory-cache-gyms.js";
import { GymServices } from "./create-gym.js";
import { FetchNearbyService } from "./fetch-nearby-gyms.js";

// testes unitarios

let gymsRepository: InMemoryCacheGymsRepository;
let gymServices: GymServices;

let sut: FetchNearbyService;
describe("fetch nearby Gyms services", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryCacheGymsRepository();
    gymServices = new GymServices(gymsRepository);
    sut = new FetchNearbyService(gymsRepository);
  });
  it("should be able to fetch nearby gyms ", async () => {
    await gymServices.execute({
      title: "smart-fit teotonio vilela",
      description: null,
      phone: "9886431855",
      latitude: -23.7442673,
      longitude: -46.7072269,
    });

    await gymServices.execute({
      title: `smart-fit cocaia`,
      description: "mais de 10km ",
      phone: "9886431855",
      latitude: -23.7441996,
      longitude: -46.5220518,
    });

    const gyms = await sut.execute({
      userLatitude: -23.7354928,
      userLongitude: -46.7103815,
    });
    expect(gyms).toEqual({
      gyms: [expect.objectContaining({ title: "smart-fit teotonio vilela" })],
    });
  });
});
