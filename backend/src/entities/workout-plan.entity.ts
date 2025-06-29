import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm"
import { User } from "./user.entity"
import { Exercise } from "./exercise.entity"
import { WorkoutSession } from "./workout-session.entity"

export enum WorkoutType {
  STRENGTH = "strength",
  CARDIO = "cardio",
  FLEXIBILITY = "flexibility",
  MIXED = "mixed",
}

@Entity("workout_plans")
export class WorkoutPlan {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column("text", { nullable: true })
  description: string

  @Column({ type: "enum", enum: WorkoutType })
  type: WorkoutType

  @Column()
  durationMinutes: number

  @Column({ default: 1 })
  difficulty: number // 1-5 scale

  @Column("simple-array")
  daysOfWeek: string[] // ['monday', 'wednesday', 'friday']

  @Column({ default: false })
  isCustom: boolean

  @Column({ default: false })
  isAiGenerated: boolean

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(
    () => User,
    (user) => user.workoutPlans,
  )
  user: User

  @ManyToMany(
    () => Exercise,
    (exercise) => exercise.workoutPlans,
  )
  @JoinTable({
    name: "workout_plan_exercises",
    joinColumn: { name: "workout_plan_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "exercise_id", referencedColumnName: "id" },
  })
  exercises: Exercise[]

  @OneToMany(
    () => WorkoutSession,
    (session) => session.workoutPlan,
  )
  sessions: WorkoutSession[]
}
