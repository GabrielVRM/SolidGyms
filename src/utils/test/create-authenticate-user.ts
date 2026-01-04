import { prisma } from "@/lib/prisma.js";
import { hashSync } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import request from "supertest";
export async function createAndAuthenticateUse(
  app: FastifyInstance,
  isAdmin = false
) {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: hashSync("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server).post("/auth").send({
    email: "johndoe@example.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
