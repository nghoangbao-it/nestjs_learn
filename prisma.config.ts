import { defineConfig, env } from "prisma/config";

import dotenv from 'dotenv'
import envConfig from "src/shared/config";
dotenv.config()


export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // url: env("DATABASE_URL"),
    url: envConfig.DATABASE_URL
  },
});
