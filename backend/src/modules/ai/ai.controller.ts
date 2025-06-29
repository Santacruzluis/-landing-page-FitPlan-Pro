import {
  Controller,
  Post,
  UseGuards,
  Get,
  Query,
  Body,
  Req,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

import { AiService } from "./ai.service";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";

@ApiTags("ai")
@Controller("ai")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
  constructor(private aiService: AiService) {}

  @Post("workout-plan")
  @ApiOperation({ summary: "Generate AI-powered workout plan" })
  async generateWorkoutPlan(@Body() preferences: any, @Req() req: any) {
    return this.aiService.generateWorkoutPlan(req.user.id, preferences);
  }

  @Post("nutrition-plan")
  @ApiOperation({ summary: "Generate AI-powered nutrition plan" })
  async generateNutritionPlan(@Req() req: any) {
    return this.aiService.generateNutritionPlan(req.user.id);
  }

  @Get("exercise-suggestions")
  @ApiOperation({ summary: "Get AI exercise suggestions" })
  async getExerciseSuggestions(
    @Query("muscleGroup") muscleGroup: string,
    @Query("level") level: string,
    @Query("equipment") equipment?: string
  ) {
    return this.aiService.generateExerciseSuggestions(
      muscleGroup,
      level,
      equipment
    );
  }
}
