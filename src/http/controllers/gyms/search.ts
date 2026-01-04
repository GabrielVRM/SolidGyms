import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeSearchGymsServices } from "@/services/factories/make-search-gym-services.js";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    search: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { search, page } = searchGymsQuerySchema.parse(request.query);

  const searchGymsUseCase = makeSearchGymsServices();
  const { gyms } = await searchGymsUseCase.execute({
    search,
    page,
  });
  return reply.status(200).send({ gyms });
}
