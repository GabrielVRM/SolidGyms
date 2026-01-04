import { makeValidateCheckInServices } from "@/services/factories/make-validate-check-in.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInServices();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
