import { prisma } from "@/lib/prisma.js";
import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";

import type { Environment } from "vitest/environments";
function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}
export default <Environment>{
  name: "prisma",
  viteEnvironment: "ssr",
  async setup() {
    // cria o DB de testes
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);
    process.env.DATABASE_URL = databaseURL;
    console.log(databaseURL);
    execSync("npx prisma db push");
    return {
      async teardown() {
        // apaga o DB de testes
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
};
