import type { CheckIn, User } from "@prisma/client";
import type { CheckInsRepository } from "@/repository/check-ins.js";

interface FetchUserCheckInHistoryServiceRequest {
  userId: string;
  page?: number;
}
interface FetchUserCheckInHistoryServiceResponse {
  checkIns: CheckIn[];
}
export class FetchUserCheckInsHistoryServices {
  constructor(private checkinsRepository: CheckInsRepository) {}
  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryServiceRequest): Promise<FetchUserCheckInHistoryServiceResponse> {
    const checkIns = await this.checkinsRepository.findManyCheckInsByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
