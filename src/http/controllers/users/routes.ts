import type { FastifyInstance } from "fastify";
import { register } from "./register.js";
import { authenticate } from "./authenticate.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { profile } from "./profile.js";
import { refresh } from "./refresh.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/auth", authenticate);
  app.patch("/token/refresh", refresh);
  // access only authenticated
  app.get(
    "/me",
    {
      onRequest: [verifyJWT],
    },
    profile
  );
}
