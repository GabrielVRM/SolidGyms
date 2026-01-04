import { PrismaUsersRepositorys } from "@/repository/prisma/users-repository.js";
import { beforeEach, describe, expect, it, test } from "vitest";
import { RegisterServices } from "./register.js";
import { compareSync } from "bcryptjs";
import { InMemoryCacheUsersRepository } from "@/repository/in-memory-cache/in-memory-cache-users-repository.js";
import { UsersAlreadyExistsError } from "./errors/user-already-exists-error.js";

// testes unitarios

let userRepository: InMemoryCacheUsersRepository;
let sut: RegisterServices;
describe("register services", () => {
  beforeEach(() => {
    userRepository = new InMemoryCacheUsersRepository();
    sut = new RegisterServices(userRepository);
  });
  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "testeBiel",
      email: "gabriel.vieira2595@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "testeBiel",
      email: "gabriel.vieira2595@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlHashed = compareSync("123456", user.password_hash);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "gabriel.vieira2595@gmail.com";
    const { user } = await sut.execute({
      name: "testeBiel",
      email: email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "testeBiel",
        email: email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UsersAlreadyExistsError);
  });
});
