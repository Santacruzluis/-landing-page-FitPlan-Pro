import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm"
import { WorkoutPlan } from "./workout-plan.entity"

export enum MuscleGroup {
  CHEST = "chest",
  BACK = "back",
  SHOULDERS = "shoulders",
  ARMS = "arms",
  LEGS = "legs",
  CORE = "core",
  CARDIO = "cardio",
  FULL_BODY = "full_body",
}

export enum ExerciseLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum EquipmentType {
  BODYWEIGHT = "bodyweight",
  DUMBBELLS = "dumbbells",
  BARBELL = "barbell",
  MACHINE = "machine",
  RESISTANCE_BANDS = "resistance_bands",
  KETTLEBELL = "kettlebell",
  CABLE = "cable",
}

@Entity("exercises")
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column("text")
  description: string

  @Column("text", { nullable: true })
  instructions: string

  @Column({ type: "enum", enum: MuscleGroup })
  muscleGroup: MuscleGroup

  @Column({ type: "enum", enum: ExerciseLevel })
  level: ExerciseLevel

  @Column({ type: "enum", enum: EquipmentType })
  equipment: EquipmentType

  @Column({ nullable: true })
  imageUrl: string

  @Column({ nullable: true })
  videoUrl: string

  @Column("simple-array", { nullable: true })
  targetMuscles: string[]

  @Column({ default: 0 })
  caloriesPerMinute: number

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(
    () => WorkoutPlan,
    (workoutPlan) => workoutPlan.exercises,
  )
  workoutPlans: WorkoutPlan[]
}
