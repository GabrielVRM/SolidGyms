import { makeFetchNearbyGymsServices } from "@/services/factories/make-fetch-nearby-gyms-service.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });
  const result = nearbyGymsQuerySchema.safeParse(request.query);

  if (!result.success) {
    return reply.status(401).send({
      message: "Parâmetros inválidos",
      errors: result.error.format(),
    });
  }
  const { latitude, longitude } = result.data;

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsServices();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });
  return reply.status(200).send({
    gyms,
  });
}
