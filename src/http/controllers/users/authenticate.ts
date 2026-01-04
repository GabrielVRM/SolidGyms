import { PrismaUsersRepositorys } from "@/repository/prisma/users-repository.js";
import { AuthenticateServices } from "@/services/authenticate.js";
import { UsersAlreadyExistsError } from "@/services/errors/user-already-exists-error.js";
import { UsersCredentialsError } from "@/services/errors/user-credentials-error.js";
import { makeAuthenticateServices } from "@/services/factories/make-authenticate-services.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateSchemaBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateSchemaBody.parse(request.body);
  try {
    const authenticateServices = makeAuthenticateServices();
    const { user } = await authenticateServices.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
        },
      }
    );
    const refreshToken = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: "10m",
        },
      }
    );
    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof UsersCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send(err);
  }
}
