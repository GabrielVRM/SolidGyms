import type { UsersRepository } from "@/repository/users-repository.js";
import { UsersAlreadyExistsError } from "./errors/user-already-exists-error.js";
import { UsersCredentialsError } from "./errors/user-credentials-error.js";
import { compareSync } from "bcryptjs";
import type { CheckIn, User } from "@prisma/client";
import type { CheckInsRepository } from "@/repository/check-ins.js";
import type { GymsRepository } from "@/repository/gyms.js";
import { waitForDebugger } from "node:inspector";
import { ResourceNotFoundError } from "./errors/user_not_found.js";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between.js";
import { MaxDistanceError } from "./errors/max-distance-error.js";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.js";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error.js";

interface ValidateCheckInServiceRequest {
  checkInId: string;
}
interface ValidateCheckInServiceResponse {
  checkIn: CheckIn;
}
export class ValidateCheckInService {
  constructor(private checkinsRepository: CheckInsRepository) {}
  async execute({
    checkInId,
  }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkinsRepository.findById(checkInId);
    if (!checkIn) throw new ResourceNotFoundError();

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkinsRepository.save(checkIn);
    return { checkIn };
  }
}
