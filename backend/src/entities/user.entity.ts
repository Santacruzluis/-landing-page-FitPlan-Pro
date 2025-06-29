import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm"
import { Exclude } from "class-transformer"
import { WorkoutPlan } from "./workout-plan.entity"
import { UserProgress } from "./user-progress.entity"
import { NutritionPlan } from "./nutrition-plan.entity"

export enum UserLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum UserGoal {
  LOSE_WEIGHT = "lose_weight",
  GAIN_MUSCLE = "gain_muscle",
  MAINTAIN = "maintain",
  IMPROVE_ENDURANCE = "improve_endurance",
}

export enum ActivityLevel {
  SEDENTARY = "sedentary",
  LIGHT = "light",
  MODERATE = "moderate",
  ACTIVE = "active",
  VERY_ACTIVE = "very_active",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  @Exclude()
  password: string

  @Column({ nullable: true })
  age: number

  @Column({ nullable: true })
  weight: number

  @Column({ nullable: true })
  height: number

  @Column({ type: "enum", enum: UserLevel, default: UserLevel.BEGINNER })
  level: UserLevel

  @Column({ type: "enum", enum: UserGoal, default: UserGoal.MAINTAIN })
  goal: UserGoal

  @Column({ type: "enum", enum: ActivityLevel, default: ActivityLevel.MODERATE })
  activityLevel: ActivityLevel

  @Column({ nullable: true })
  profileImage: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => WorkoutPlan,
    (workoutPlan) => workoutPlan.user,
  )
  workoutPlans: WorkoutPlan[]

  @OneToOne(
    () => NutritionPlan,
    (nutritionPlan) => nutritionPlan.user,
  )
  @JoinColumn()
  nutritionPlan: NutritionPlan

  @OneToMany(
    () => UserProgress,
    (progress) => progress.user,
  )
  progress: UserProgress[]
}
