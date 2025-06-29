import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Exercise, ExerciseLevel } from "@/entities/exercise.entity"
import { CreateExerciseDto } from "./dto/create-exercise.dto"
import { UpdateExerciseDto } from "./dto/update-exercise.dto"

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = this.exercisesRepository.create(createExerciseDto)
    return this.exercisesRepository.save(exercise)
  }

  async findAll(): Promise<Exercise[]> {
    return this.exercisesRepository.find({
      where: { isActive: true },
      order: { name: "ASC" },
    })
  }

  async findById(id: string): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findOne({
      where: { id, isActive: true },
    })
    if (!exercise) {
      throw new NotFoundException("Exercise not found")
    }
    return exercise
  }

  async findByLevel(level: ExerciseLevel): Promise<Exercise[]> {
    return this.exercisesRepository.find({
      where: { level, isActive: true },
      order: { name: "ASC" },
    })
  }

  async findByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
    return this.exercisesRepository.find({
      where: { muscleGroup: muscleGroup as any, isActive: true },
      order: { name: "ASC" },
    })
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    await this.exercisesRepository.update(id, updateExerciseDto)
    return this.findById(id)
  }

  async remove(id: string): Promise<void> {
    const result = await this.exercisesRepository.update(id, { isActive: false })
    if (result.affected === 0) {
      throw new NotFoundException("Exercise not found")
    }
  }

  async search(query: string): Promise<Exercise[]> {
    return this.exercisesRepository
      .createQueryBuilder("exercise")
      .where("exercise.isActive = :isActive", { isActive: true })
      .andWhere("(LOWER(exercise.name) LIKE LOWER(:query) OR LOWER(exercise.description) LIKE LOWER(:query))", {
        query: `%${query}%`,
      })
      .orderBy("exercise.name", "ASC")
      .getMany()
  }
}
