import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEnum, IsOptional, IsArray, IsNumber } from "class-validator"
import { MuscleGroup, ExerciseLevel, EquipmentType } from "@/entities/exercise.entity"

export class CreateExerciseDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  instructions?: string

  @ApiProperty({ enum: MuscleGroup })
  @IsEnum(MuscleGroup)
  muscleGroup: MuscleGroup

  @ApiProperty({ enum: ExerciseLevel })
  @IsEnum(ExerciseLevel)
  level: ExerciseLevel

  @ApiProperty({ enum: EquipmentType })
  @IsEnum(EquipmentType)
  equipment: EquipmentType

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  videoUrl?: string

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetMuscles?: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  caloriesPerMinute?: number
}
