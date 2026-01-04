import { beforeEach, describe, expect, it, test } from "vitest";
import { InMemoryCacheUsersRepository } from "@/repository/in-memory-cache/in-memory-cache-users-repository.js";
import { AuthenticateServices } from "./authenticate.js";
import { hashSync } from "bcryptjs";
import { UsersCredentialsError } from "./errors/user-credentials-error.js";

// testes unitarios

let userRepository: InMemoryCacheUsersRepository;
//pattern de variavel pai!
let sut: AuthenticateServices;

describe("register services", () => {
  beforeEach(() => {
    userRepository = new InMemoryCacheUsersRepository();
    sut = new AuthenticateServices(userRepository);
  });
  it("should be able to authenticate", async () => {
    await userRepository.create({
      name: "testeBiel",
      email: "gabriel.vieira2595@gmail.com",
      password_hash: hashSync("123456", 10),
    });
    const { user } = await sut.execute({
      email: "gabriel.vieira2595@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "gabriel.vieira2595@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UsersCredentialsError);
  });
  it("should not be able to authenticate with wrong password", async () => {
    await userRepository.create({
      name: "testeBiel",
      email: "gabriel.vieira2595@gmail.com",
      password_hash: hashSync("123456", 10),
    });

    await expect(() =>
      sut.execute({
        email: "gabriel.vieira2595@gmail.com",
        password: "123457",
      })
    ).rejects.toBeInstanceOf(UsersCredentialsError);
  });
});
