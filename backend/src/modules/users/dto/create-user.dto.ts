import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, IsOptional, IsEnum, IsNumber } from "class-validator"
import { UserLevel, UserGoal, ActivityLevel } from "../../../entities/user.entity"

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  lastName: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  age?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  weight?: number

  @ApiProperty({ required: false })
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
