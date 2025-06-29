import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "@/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        "id",
        "email",
        "firstName",
        "lastName",
        "level",
        "goal",
        "createdAt",
      ],
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ["workoutPlans", "nutritionPlan", "progress"],
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("User not found");
    }
  }

  async calculateBMR(user: User): Promise<number> {
    if (!user.weight || !user.height || !user.age) {
      throw new Error("Missing required data for BMR calculation");
    }

    // Mifflin-St Jeor Equation
    const bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age;
    return bmr + (user.goal === "gain_muscle" ? 5 : -161); // Simplified gender adjustment
  }

  async calculateTDEE(user: User): Promise<number> {
    const bmr = await this.calculateBMR(user);
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    return bmr * activityMultipliers[user.activityLevel];
  }
}
