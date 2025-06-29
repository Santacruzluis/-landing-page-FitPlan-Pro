import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "../../config/database.config";
import {
  Exercise,
  MuscleGroup,
  ExerciseLevel,
  EquipmentType,
} from "../../entities/exercise.entity";
import { WorkoutPlan, WorkoutType } from "../../entities/workout-plan.entity";
import {
  WorkoutSession,
  SessionStatus,
} from "../../entities/workout-session.entity";

async function seed() {
  const configService = new ConfigService();
  const databaseConfig = new DatabaseConfig(configService);
  const dataSource = new DataSource(
    databaseConfig.createTypeOrmOptions() as any
  );

  try {
    await dataSource.initialize();
    console.log("🌱 Starting database seeding...");

    // Seed exercises
    const exerciseRepository = dataSource.getRepository(Exercise);

    const exercises = [
      {
        name: "Push-ups",
        description:
          "Classic bodyweight exercise for chest, shoulders, and triceps",
        instructions:
          "Start in plank position, lower body until chest nearly touches floor, push back up",
        muscleGroup: MuscleGroup.CHEST,
        level: ExerciseLevel.BEGINNER,
        equipment: EquipmentType.BODYWEIGHT,
        targetMuscles: ["Chest", "Shoulders", "Triceps"],
        caloriesPerMinute: 8,
      },
      {
        name: "Squats",
        description:
          "Fundamental lower body exercise targeting quads and glutes",
        instructions:
          "Stand with feet shoulder-width apart, lower hips back and down, return to standing",
        muscleGroup: MuscleGroup.LEGS,
        level: ExerciseLevel.BEGINNER,
        equipment: EquipmentType.BODYWEIGHT,
        targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
        caloriesPerMinute: 10,
      },
      {
        name: "Pull-ups",
        description: "Upper body pulling exercise for back and biceps",
        instructions:
          "Hang from bar with overhand grip, pull body up until chin clears bar",
        muscleGroup: MuscleGroup.BACK,
        level: ExerciseLevel.INTERMEDIATE,
        equipment: EquipmentType.BODYWEIGHT,
        targetMuscles: ["Latissimus Dorsi", "Biceps", "Rhomboids"],
        caloriesPerMinute: 12,
      },
      {
        name: "Plank",
        description: "Core strengthening isometric exercise",
        instructions:
          "Hold push-up position with forearms on ground, keep body straight",
        muscleGroup: MuscleGroup.CORE,
        level: ExerciseLevel.BEGINNER,
        equipment: EquipmentType.BODYWEIGHT,
        targetMuscles: ["Core", "Shoulders", "Glutes"],
        caloriesPerMinute: 5,
      },
      {
        name: "Deadlift",
        description: "Compound exercise working posterior chain",
        instructions:
          "Stand with feet hip-width apart, hinge at hips to lower bar, drive hips forward to stand",
        muscleGroup: MuscleGroup.BACK,
        level: ExerciseLevel.ADVANCED,
        equipment: EquipmentType.BARBELL,
        targetMuscles: ["Hamstrings", "Glutes", "Lower Back", "Traps"],
        caloriesPerMinute: 15,
      },
    ];

    for (const exerciseData of exercises) {
      const existingExercise = await exerciseRepository.findOne({
        where: { name: exerciseData.name },
      });

      if (!existingExercise) {
        const exercise = exerciseRepository.create(exerciseData);
        await exerciseRepository.save(exercise);
        console.log(`✅ Created exercise: ${exerciseData.name}`);
      }
    }

    // Seed workout plan
    const workoutPlanRepository = dataSource.getRepository(WorkoutPlan);
    const workoutSessionRepository = dataSource.getRepository(WorkoutSession);

    const planName = "Plan de ejemplo semanal";
    let workoutPlan = await workoutPlanRepository.findOne({
      where: { name: planName },
    });

    if (!workoutPlan) {
      const allExercises = await exerciseRepository.find();
      workoutPlan = workoutPlanRepository.create({
        name: planName,
        description: "Un plan de entrenamiento de ejemplo para la semana.",
        type: WorkoutType.MIXED,
        durationMinutes: 60,
        difficulty: 2,
        daysOfWeek: ["monday", "wednesday", "friday"],
        isCustom: false,
        isAiGenerated: false,
        isActive: true,
        exercises: allExercises,
      });
      await workoutPlanRepository.save(workoutPlan);
      console.log(`✅ Created workout plan: ${planName}`);
    }

    // Seed workout sessions (rutinas realizadas)
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const sessionDate = new Date(today);
      sessionDate.setDate(today.getDate() - i * 2);

      const session = workoutSessionRepository.create({
        scheduledDate: sessionDate,
        startTime: new Date(sessionDate.getTime() + 9 * 60 * 60 * 1000),
        endTime: new Date(sessionDate.getTime() + 10 * 60 * 60 * 1000),
        status: SessionStatus.COMPLETED,
        actualDurationMinutes: 60,
        caloriesBurned: 400 + i * 10,
        notes: `Sesión de ejemplo #${i + 1}`,
        exerciseData: null,
        workoutPlan: workoutPlan,
      });
      await workoutSessionRepository.save(session);
      console.log(
        `✅ Created workout session for ${sessionDate.toISOString().slice(0, 10)}`
      );
    }

    console.log("🎉 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await dataSource.destroy();
  }
}

// Run if called directly
if (require.main === module) {
  seed();
}

export default seed;
