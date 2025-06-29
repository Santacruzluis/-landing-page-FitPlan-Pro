import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"

export enum ProgressType {
  WEIGHT = "weight",
  BODY_FAT = "body_fat",
  MUSCLE_MASS = "muscle_mass",
  MEASUREMENTS = "measurements",
  PERFORMANCE = "performance",
}

@Entity("user_progress")
export class UserProgress {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "enum", enum: ProgressType })
  type: ProgressType

  @Column("decimal", { precision: 5, scale: 2 })
  value: number

  @Column()
  unit: string

  @Column("text", { nullable: true })
  notes: string

  @Column({ type: "date" })
  recordedDate: Date

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(
    () => User,
    (user) => user.progress,
  )
  user: User
}
