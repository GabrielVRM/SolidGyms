import { UsersCredentialsError } from "@/services/errors/user-credentials-error.js";
import { makeGetProfile } from "@/services/factories/make-get-profile.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // const authenticateSchemaBody = z.object({
  //   user_id: z.string(),
  // });

  // const { user_id } = authenticateSchemaBody.parse(request.body);
  try {
    const authenticateServices = makeGetProfile();
    const { password_hash, ...user }: any = await authenticateServices.execute({
      user_id: request.user.sub,
    });
    return reply.status(200).send({ user });
  } catch (err) {
    if (err instanceof UsersCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send();
  }
}
