import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { NutritionPlan } from "./nutrition-plan.entity"

export enum MealType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACK = "snack",
}

@Entity("food_entries")
export class FoodEntry {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  foodName: string

  @Column("decimal", { precision: 5, scale: 2 })
  quantity: number

  @Column()
  unit: string // grams, cups, pieces, etc.

  @Column()
  calories: number

  @Column("decimal", { precision: 5, scale: 2 })
  protein: number

  @Column("decimal", { precision: 5, scale: 2 })
  carbs: number

  @Column("decimal", { precision: 5, scale: 2 })
  fats: number

  @Column({ type: "enum", enum: MealType })
  mealType: MealType

  @Column({ type: "date" })
  consumedDate: Date

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(
    () => NutritionPlan,
    (nutritionPlan) => nutritionPlan.foodEntries,
  )
  nutritionPlan: NutritionPlan
}
