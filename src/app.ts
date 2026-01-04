import fastify from "fastify";
import { z, ZodError } from "zod";
import { usersRoutes } from "./http/controllers/users/routes.js";
import { env } from "./env/index.js";
import fastifyJwt from "@fastify/jwt";
import { gymsRoutes } from "./http/controllers/gyms/routes.js";
import { checkInsRoutes } from "./http/controllers/check-ins/routes.js";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});
app.register(fastifyCookie);
app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error:", issues: error.format() });
  }

  if (env.NODE_ENV !== "prod") {
    console.error(error);
  } else {
    // Todo: here we  should log to an external tool like sentry/DataDog/NewRelic
  }
  return reply.status(500).send({ message: "internal server error" });
});
