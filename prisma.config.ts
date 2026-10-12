try {
  require("dotenv/config");
} catch {
  // Abaikan jika dotenv tidak tersedia (misal di production container)
}
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
