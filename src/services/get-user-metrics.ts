import type { CheckIn, User } from "@prisma/client";
import type { CheckInsRepository } from "@/repository/check-ins.js";

interface GetUserMetricsServiceRequest {
  userId: string;
}
interface GetUserMetricsServiceResponse {
  metrics: number;
}
export class GetUserMetricsServices {
  constructor(private checkinsRepository: CheckInsRepository) {}
  async execute({
    userId,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
    const metrics = await this.checkinsRepository.countByUserId(userId);

    return { metrics };
  }
}
