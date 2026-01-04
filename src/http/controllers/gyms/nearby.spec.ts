import request from "supertest";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUse } from "@/utils/test/create-authenticate-user.js";
import { app } from "@/app.js";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUse(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "smart-fit teotonio vilela",
        description: null,
        phone: "9886431855",
        latitude: -23.7442673,
        longitude: -46.7072269,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: `smart-fit cocaia`,
        description: "mais de 10km ",
        phone: "9886431855",
        latitude: -23.7441996,
        longitude: -46.5220518,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -23.7354928,
        longitude: -46.7103815,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "smart-fit teotonio vilela",
      }),
    ]);
  });
});
