import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerModule } from "@nestjs/throttler";

import { DatabaseConfig } from "./config/database.config";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { WorkoutsModule } from "./modules/workouts/workouts.module";
import { ExercisesModule } from "./modules/exercises/exercises.module";
import { NutritionModule } from "./modules/nutrition/nutrition.module";
import { AiModule } from "./modules/ai/ai.module";
import { ProgressModule } from "./modules/progress/progress.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    UsersModule,
    WorkoutsModule,
    ExercisesModule,
    NutritionModule,
    AiModule,
    ProgressModule,
  ],
})
export class AppModule {}
