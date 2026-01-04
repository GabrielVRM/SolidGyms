import { makeFetchUserCheckInsHistoryServices } from "@/services/factories/make-fetch-member-check-ins-history-service.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsHistoryServices =
    makeFetchUserCheckInsHistoryServices();

  const { checkIns } = await fetchUserCheckInsHistoryServices.execute({
    page,
    userId: request.user.sub,
  });
  return reply.status(200).send({
    checkIns,
  });
}
