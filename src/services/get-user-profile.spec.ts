import { InMemoryCacheUsersRepository } from "@/repository/in-memory-cache/in-memory-cache-users-repository.js";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { GetProfileService } from "./get-user-profile.js";
import { ResourceNotFoundError } from "./errors/user_not_found.js";

let usersRepository: InMemoryCacheUsersRepository;
let sut: GetProfileService;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryCacheUsersRepository();
    sut = new GetProfileService(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      user_id: createdUser.id,
    });
    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        user_id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
