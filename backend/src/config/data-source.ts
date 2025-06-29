import { DataSource } from "typeorm";
import { config } from "dotenv";

// Cargar variables de entorno
config();

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migrations/*.js"],
  synchronize: false,
  logging: !isProduction,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  extra: isProduction
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {},
});

// Inicializar la conexión
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
