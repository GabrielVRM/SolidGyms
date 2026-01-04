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

interface CheckinServiceRequest {
  userId: string;
  gymId: string;
  userLongitude: number;
  userLatitude: number;
}
interface CheckinServiceResponse {
  checkIn: CheckIn;
}
export class CheckinService {
  constructor(
    private checkinsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}
  async execute({
    userId,
    gymId,
    userLongitude,
    userLatitude,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const gym = await this.gymsRepository.findByGyms(gymId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );
    const maxDistanceError = 0.1;
    if (distance > maxDistanceError) {
      throw new MaxDistanceError();
    }
    const checkInOnSameDate = await this.checkinsRepository.findByCheckIn(
      userId,
      new Date()
    );
    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError();
    }
    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
