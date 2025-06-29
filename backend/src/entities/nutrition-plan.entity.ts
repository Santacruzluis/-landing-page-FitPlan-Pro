import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm"
import { User } from "./user.entity"
import { FoodEntry } from "./food-entry.entity"

@Entity("nutrition_plans")
export class NutritionPlan {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  dailyCalories: number

  @Column("decimal", { precision: 5, scale: 2 })
  proteinGrams: number

  @Column("decimal", { precision: 5, scale: 2 })
  carbsGrams: number

  @Column("decimal", { precision: 5, scale: 2 })
  fatsGrams: number

  @Column("decimal", { precision: 5, scale: 2 })
  fiberGrams: number

  @Column("decimal", { precision: 5, scale: 2 })
  waterLiters: number

  @Column("text", { nullable: true })
  dietaryRestrictions: string

  @Column("simple-array", { nullable: true })
  allergies: string[]

  @Column({ default: false })
  isAiGenerated: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToOne(
    () => User,
    (user) => user.nutritionPlan,
  )
  user: User

  @OneToMany(
    () => FoodEntry,
    (foodEntry) => foodEntry.nutritionPlan,
  )
  foodEntries: FoodEntry[]
}
