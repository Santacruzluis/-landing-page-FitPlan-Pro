import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";

import { User, UserLevel } from "@/entities/user.entity";
import { UsersService } from "@/modules/users/users.service";
import { ExercisesService } from "@/modules/exercises/exercises.service";
import { ExerciseLevel } from "@/entities/exercise.entity";

@Injectable()
export class AiService {
  private openai: OpenAI | null = null;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private exercisesService: ExercisesService
  ) {
    const apiKey = this.configService.get<string>("OPENAI_API_KEY");
    if (apiKey && apiKey !== "your-openai-api-key") {
      this.openai = new OpenAI({
        apiKey: apiKey,
      });
    }
  }

  async generateWorkoutPlan(userId: string, preferences?: any) {
    const user = await this.usersService.findById(userId);
    const exerciseLevel = this.convertUserLevelToExerciseLevel(user.level);
    const exercises = await this.exercisesService.findByLevel(exerciseLevel);

    if (this.openai) {
      const prompt = this.buildWorkoutPrompt(user, exercises, preferences);

      try {
        const completion = await this.openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a professional fitness trainer and nutritionist. Provide personalized workout plans based on user data.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        });

        return this.parseWorkoutResponse(completion.choices[0].message.content);
      } catch (error) {
        // Fallback to predefined workout plans if AI fails
        return this.generateFallbackWorkout(user);
      }
    } else {
      // No OpenAI API key, use fallback
      return this.generateFallbackWorkout(user);
    }
  }

  async generateNutritionPlan(userId: string) {
    const user = await this.usersService.findById(userId);
    const tdee = await this.usersService.calculateTDEE(user);

    if (this.openai) {
      const prompt = this.buildNutritionPrompt(user, tdee);

      try {
        const completion = await this.openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a certified nutritionist. Provide personalized meal plans and nutrition advice.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 1200,
          temperature: 0.7,
        });

        return this.parseNutritionResponse(completion.choices[0].message.content);
      } catch (error) {
        return this.generateFallbackNutrition(user, tdee);
      }
    } else {
      // No OpenAI API key, use fallback
      return this.generateFallbackNutrition(user, tdee);
    }
  }

  async generateExerciseSuggestions(
    muscleGroup: string,
    level: string,
    equipment?: string
  ) {
    if (this.openai) {
      const prompt = `Suggest 5 effective ${muscleGroup} exercises for ${level} level. ${equipment ? `Equipment available: ${equipment}` : "Bodyweight exercises preferred"}. Include brief instructions for each.`;

      try {
        const completion = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a fitness expert. Provide clear, safe exercise recommendations.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 800,
          temperature: 0.8,
        });

        return this.parseExerciseSuggestions(
          completion.choices[0].message.content
        );
      } catch (error) {
        return this.getFallbackExercises(muscleGroup, level);
      }
    } else {
      // No OpenAI API key, use fallback
      return this.getFallbackExercises(muscleGroup, level);
    }
  }

  private convertUserLevelToExerciseLevel(userLevel: UserLevel): ExerciseLevel {
    switch (userLevel) {
      case UserLevel.BEGINNER:
        return ExerciseLevel.BEGINNER;
      case UserLevel.INTERMEDIATE:
        return ExerciseLevel.INTERMEDIATE;
      case UserLevel.ADVANCED:
        return ExerciseLevel.ADVANCED;
      default:
        return ExerciseLevel.BEGINNER;
    }
  }

  private buildWorkoutPrompt(
    user: User,
    exercises: any[],
    preferences?: any
  ): string {
    return `Create a personalized workout plan for:
    - User Level: ${user.level}
    - Goal: ${user.goal}
    - Activity Level: ${user.activityLevel}
    - Age: ${user.age}
    - Available exercises: ${exercises.map((e) => e.name).join(", ")}
    ${preferences ? `- Preferences: ${JSON.stringify(preferences)}` : ""}
    
    Provide a weekly plan with specific exercises, sets, reps, and rest periods.`;
  }

  private buildNutritionPrompt(user: User, tdee: number): string {
    return `Create a nutrition plan for:
    - Goal: ${user.goal}
    - TDEE: ${tdee} calories
    - Activity Level: ${user.activityLevel}
    - Age: ${user.age}
    - Weight: ${user.weight}kg
    
    Provide daily calorie target, macronutrient breakdown, and meal suggestions.`;
  }

  private parseWorkoutResponse(response: string) {
    // Parse AI response and structure it
    return {
      plan: response,
      exercises: [],
      duration: 45,
      difficulty: 3,
      isAiGenerated: true,
    };
  }

  private parseNutritionResponse(response: string) {
    return {
      plan: response,
      dailyCalories: 2000,
      macros: { protein: 150, carbs: 200, fats: 70 },
      isAiGenerated: true,
    };
  }

  private parseExerciseSuggestions(response: string) {
    return {
      suggestions: response.split("\n").filter((line) => line.trim()),
      isAiGenerated: true,
    };
  }

  private generateFallbackWorkout(user: User) {
    const workouts = {
      beginner: {
        name: "Beginner Full Body",
        exercises: ["Push-ups", "Squats", "Plank", "Walking"],
        duration: 30,
      },
      intermediate: {
        name: "Intermediate Split",
        exercises: ["Bench Press", "Deadlifts", "Pull-ups", "Lunges"],
        duration: 45,
      },
      advanced: {
        name: "Advanced Training",
        exercises: ["Olympic Lifts", "Compound Movements", "Plyometrics"],
        duration: 60,
      },
    };

    return workouts[user.level] || workouts.beginner;
  }

  private generateFallbackNutrition(user: User, tdee: number) {
    const goalAdjustments = {
      lose_weight: -500,
      maintain: 0,
      gain_muscle: 300,
      improve_endurance: 200,
    };

    const targetCalories = tdee + goalAdjustments[user.goal];

    return {
      dailyCalories: Math.round(targetCalories),
      protein: Math.round(user.weight * 2.2),
      carbs: Math.round((targetCalories * 0.45) / 4),
      fats: Math.round((targetCalories * 0.25) / 9),
      isAiGenerated: false,
    };
  }

  private getFallbackExercises(muscleGroup: string, level: string) {
    const exercises = {
      chest: {
        beginner: ["Push-ups", "Wall Push-ups", "Incline Push-ups"],
        intermediate: ["Bench Press", "Dumbbell Flyes", "Dips"],
        advanced: [
          "Decline Bench Press",
          "Weighted Dips",
          "Plyometric Push-ups",
        ],
      },
      back: {
        beginner: ["Superman", "Bird Dog", "Cat-Cow"],
        intermediate: ["Pull-ups", "Rows", "Lat Pulldowns"],
        advanced: ["Weighted Pull-ups", "T-Bar Rows", "Deadlifts"],
      },
      legs: {
        beginner: ["Squats", "Lunges", "Step-ups"],
        intermediate: ["Deadlifts", "Leg Press", "Romanian Deadlifts"],
        advanced: [
          "Olympic Squats",
          "Plyometric Jumps",
          "Single-leg Deadlifts",
        ],
      },
    };

    return {
      suggestions: exercises[muscleGroup]?.[level] || ["Exercise not found"],
      isAiGenerated: false,
    };
  }
}
