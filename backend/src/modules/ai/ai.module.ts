import { Module } from "@nestjs/common";

import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";
import { UsersModule } from "../../modules/users/users.module";
import { ExercisesModule } from "../../modules/exercises/exercises.module";

@Module({
  imports: [UsersModule, ExercisesModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
