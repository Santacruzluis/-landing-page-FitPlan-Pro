import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ExercisesService } from "./exercises.service";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";
import { Exercise } from "@/entities/exercise.entity";

@ApiTags("exercises")
@Controller("exercises")
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new exercise" })
  @ApiResponse({
    status: 201,
    description: "Exercise created successfully",
    type: Exercise,
  })
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    try {
      return await this.exercisesService.create(createExerciseDto);
    } catch (error) {
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all exercises" })
  @ApiResponse({
    status: 200,
    description: "List of exercises",
    type: [Exercise],
  })
  async findAll() {
    try {
      return await this.exercisesService.findAll();
    } catch (error) {
      // Si hay un error de base de datos, devolver array vacío en lugar de error
      console.error("Error fetching exercises:", error);
      return [];
    }
  }

  @Get("search")
  @ApiOperation({ summary: "Search exercises by query" })
  @ApiResponse({ status: 200, description: "Search results", type: [Exercise] })
  async search(@Query("q") query: string) {
    try {
      return await this.exercisesService.search(query);
    } catch (error) {
      console.error("Error searching exercises:", error);
      return [];
    }
  }

  @Get("level/:level")
  @ApiOperation({ summary: "Get exercises by level" })
  @ApiResponse({
    status: 200,
    description: "Exercises by level",
    type: [Exercise],
  })
  async findByLevel(@Param("level") level: string) {
    try {
      return await this.exercisesService.findByLevel(level as any);
    } catch (error) {
      console.error("Error fetching exercises by level:", error);
      return [];
    }
  }

  @Get("muscle/:muscleGroup")
  @ApiOperation({ summary: "Get exercises by muscle group" })
  @ApiResponse({
    status: 200,
    description: "Exercises by muscle group",
    type: [Exercise],
  })
  async findByMuscleGroup(@Param("muscleGroup") muscleGroup: string) {
    try {
      return await this.exercisesService.findByMuscleGroup(muscleGroup);
    } catch (error) {
      console.error("Error fetching exercises by muscle group:", error);
      return [];
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get exercise by ID" })
  @ApiResponse({ status: 200, description: "Exercise found", type: Exercise })
  @ApiResponse({ status: 404, description: "Exercise not found" })
  async findOne(@Param("id") id: string) {
    try {
      return await this.exercisesService.findById(id);
    } catch (error) {
      if (error.message === "Exercise not found") {
        throw new HttpException("Ejercicio no encontrado", HttpStatus.NOT_FOUND);
      }
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update exercise" })
  @ApiResponse({
    status: 200,
    description: "Exercise updated successfully",
    type: Exercise,
  })
  async update(
    @Param("id") id: string,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    try {
      return await this.exercisesService.update(id, updateExerciseDto);
    } catch (error) {
      if (error.message === "Exercise not found") {
        throw new HttpException("Ejercicio no encontrado", HttpStatus.NOT_FOUND);
      }
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete exercise" })
  @ApiResponse({ status: 200, description: "Exercise deleted successfully" })
  async remove(@Param("id") id: string) {
    try {
      return await this.exercisesService.remove(id);
    } catch (error) {
      if (error.message === "Exercise not found") {
        throw new HttpException("Ejercicio no encontrado", HttpStatus.NOT_FOUND);
      }
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
