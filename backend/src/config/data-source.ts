import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

const dataSourceConfig = {
  type: "postgres" as const,
  host: configService.get("DATABASE_HOST", "localhost"),
  port: configService.get("DATABASE_PORT", 5432),
  username: configService.get("DATABASE_USERNAME", "postgres"),
  password: configService.get("DATABASE_PASSWORD", "password"),
  database: configService.get("DATABASE_NAME", "fitplan_pro"),
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migrations/*.js"],
  synchronize: configService.get("NODE_ENV") === "development",
  logging: configService.get("NODE_ENV") === "development",
  ssl: false,
};

export default new DataSource(dataSourceConfig);
