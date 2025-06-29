import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength, IsOptional, IsEnum, IsNumber } from "class-validator"
import { UserLevel, UserGoal, ActivityLevel } from "@/entities/user.entity"

export class RegisterDto {
  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email: string

  @ApiProperty({ example: "John" })
  @IsString()
  firstName: string

  @ApiProperty({ example: "Doe" })
  @IsString()
  lastName: string

  @ApiProperty({ example: "password123", minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  @IsNumber()
  age?: number

  @ApiProperty({ example: 70, required: false })
  @IsOptional()
  @IsNumber()
  weight?: number

  @ApiProperty({ example: 175, required: false })
  @IsOptional()
  @IsNumber()
  height?: number

  @ApiProperty({ enum: UserLevel, required: false })
  @IsOptional()
  @IsEnum(UserLevel)
  level?: UserLevel

  @ApiProperty({ enum: UserGoal, required: false })
  @IsOptional()
  @IsEnum(UserGoal)
  goal?: UserGoal

  @ApiProperty({ enum: ActivityLevel, required: false })
  @IsOptional()
  @IsEnum(ActivityLevel)
  activityLevel?: ActivityLevel
}
