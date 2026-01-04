import type { GymsRepository } from "@/repository/gyms.js";

interface SearchServicesRequest {
  search: string;
  page: number;
}

export class SearchServices {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({ search, page }: SearchServicesRequest) {
    const gyms = await this.gymsRepository.searchMany(search, page);
    return { gyms };
  }
}
