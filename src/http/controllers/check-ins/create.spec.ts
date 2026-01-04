import { app } from "@/app.js";
import { prisma } from "@/lib/prisma.js";
import { createAndAuthenticateUse } from "@/utils/test/create-authenticate-user.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUse(app);

    const gym = await prisma.gym.create({
      data: {
        title: "smart-fit teotonio vilela",
        description: null,
        phone: "9886431855",
        latitude: -23.7442673,
        longitude: -46.7072269,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -23.7442673,
        longitude: -46.7072269,
      });

    expect(response.statusCode).toEqual(201);
  });
});
