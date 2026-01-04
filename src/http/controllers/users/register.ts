import { UsersAlreadyExistsError } from "@/services/errors/user-already-exists-error.js";
import { makeRegisterServices } from "@/services/factories/make-register-services.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerSchemaBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerSchemaBody.parse(request.body);
  try {
    const registerServices = makeRegisterServices();

    await registerServices.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UsersAlreadyExistsError) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send();
  }
  return reply.status(201).send();
}
