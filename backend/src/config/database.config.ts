import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from "@nestjs/typeorm";

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction = this.configService.get("NODE_ENV") === "production";

    // Para Render, usar DATABASE_URL si está disponible
    const databaseUrl = this.configService.get("DATABASE_URL");

    if (databaseUrl) {
      return {
        type: "postgres",
        url: databaseUrl,
        entities: ["dist/**/*.entity.js"],
        migrations: ["dist/migrations/*.js"],
        synchronize: false, // Nunca usar en producción
        logging: !isProduction,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
        extra: isProduction
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : {},
      };
    }

    // Configuración para desarrollo local
    return {
      type: "postgres",
      host: this.configService.get("DATABASE_HOST", "localhost"),
      port: this.configService.get("DATABASE_PORT", 5432),
      username: this.configService.get("DATABASE_USERNAME", "postgres"),
      password: this.configService.get("DATABASE_PASSWORD", "password"),
      database: this.configService.get("DATABASE_NAME", "fitplan_pro"),
      entities: ["dist/**/*.entity.js"],
      migrations: ["dist/migrations/*.js"],
      synchronize: this.configService.get("NODE_ENV") === "development",
      logging: this.configService.get("NODE_ENV") === "development",
      ssl: false,
    };
  }
}
