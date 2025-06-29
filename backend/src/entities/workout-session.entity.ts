import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"
import { WorkoutPlan } from "./workout-plan.entity"

export enum SessionStatus {
  PLANNED = "planned",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  SKIPPED = "skipped",
}

@Entity("workout_sessions")
export class WorkoutSession {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "date" })
  scheduledDate: Date

  @Column({ type: "timestamp", nullable: true })
  startTime: Date

  @Column({ type: "timestamp", nullable: true })
  endTime: Date

  @Column({ type: "enum", enum: SessionStatus, default: SessionStatus.PLANNED })
  status: SessionStatus

  @Column({ nullable: true })
  actualDurationMinutes: number

  @Column({ nullable: true })
  caloriesBurned: number

  @Column("text", { nullable: true })
  notes: string

  @Column("jsonb", { nullable: true })
  exerciseData: any // Store sets, reps, weights, etc.

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User)
  user: User

  @ManyToOne(
    () => WorkoutPlan,
    (workoutPlan) => workoutPlan.sessions,
  )
  workoutPlan: WorkoutPlan
}
