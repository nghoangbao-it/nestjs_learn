import { defineConfig, env } from "prisma/config";

import dotenv from 'dotenv'
import e from "express";
dotenv.config()


export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // url: env("DATABASE_URL"),
    url: env("DATABASE_URL"),
  },
});
