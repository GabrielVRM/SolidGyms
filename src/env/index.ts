import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number(),
});
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log("Invalid environment Error ❌", _env.error.format());
  throw new Error("Invalid environment Error ❌");
}

export const env = _env.data;
