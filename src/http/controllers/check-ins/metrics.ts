import { makeGetUserMetricsServices } from "@/services/factories/make-get-use-metrics-service.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsServices();

  const { metrics } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    metrics,
  });
}
