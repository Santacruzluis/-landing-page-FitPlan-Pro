import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { NutritionController } from "./nutrition.controller"
import { NutritionService } from "./nutrition.service"
import { NutritionPlan } from "@/entities/nutrition-plan.entity"
import { FoodEntry } from "@/entities/food-entry.entity"

@Module({
  imports: [TypeOrmModule.forFeature([NutritionPlan, FoodEntry])],
  controllers: [NutritionController],
  providers: [NutritionService],
  exports: [NutritionService],
})
export class NutritionModule {}
