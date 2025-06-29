import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    return Promise.reject(error);
  }
);

// Interceptor para agregar token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interfaces
export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions?: string;
  muscleGroup: string;
  level: string;
  equipment: string;
  imageUrl?: string;
  videoUrl?: string;
  targetMuscles?: string[];
  caloriesPerMinute: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExerciseDto {
  name: string;
  description: string;
  instructions?: string;
  muscleGroup: string;
  level: string;
  equipment: string;
  imageUrl?: string;
  videoUrl?: string;
  targetMuscles?: string[];
  caloriesPerMinute?: number;
}

export interface UpdateExerciseDto extends Partial<CreateExerciseDto> {}

export interface WorkoutSession {
  id: string;
  scheduledDate: string;
  startTime?: string;
  endTime?: string;
  status: string;
  actualDurationMinutes?: number;
  caloriesBurned?: number;
  notes?: string;
  exerciseData?: any;
  workoutPlan: any;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkoutSessionDto {
  workoutPlanId: string;
  scheduledDate: string;
  actualDurationMinutes?: number;
  notes?: string;
}

export interface UpdateWorkoutSessionDto {
  scheduledDate?: string;
  actualDurationMinutes?: number;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  level: string;
  goal: string;
  age?: number;
  weight?: number;
  height?: number;
  activityLevel: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age?: number;
  weight?: number;
  height?: number;
  level?: string;
  goal?: string;
  activityLevel?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface AIWorkoutPlan {
  plan: string;
  exercises: string[];
  duration: number;
  difficulty: number;
  isAiGenerated: boolean;
}

export interface AINutritionPlan {
  plan: string;
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  isAiGenerated: boolean;
}

// API Functions
export const exercisesApi = {
  getAll: async (): Promise<Exercise[]> => {
    const response = await api.get("/exercises");
    return response.data;
  },

  search: async (query: string): Promise<Exercise[]> => {
    const response = await api.get(
      `/exercises/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },

  getByLevel: async (level: string): Promise<Exercise[]> => {
    const response = await api.get(`/exercises/level/${level}`);
    return response.data;
  },

  getByMuscleGroup: async (muscleGroup: string): Promise<Exercise[]> => {
    const response = await api.get(`/exercises/muscle/${muscleGroup}`);
    return response.data;
  },

  getById: async (id: string): Promise<Exercise> => {
    const response = await api.get(`/exercises/${id}`);
    return response.data;
  },

  create: async (exercise: CreateExerciseDto): Promise<Exercise> => {
    const response = await api.post("/exercises", exercise);
    return response.data;
  },

  update: async (
    id: string,
    exercise: UpdateExerciseDto
  ): Promise<Exercise> => {
    const response = await api.patch(`/exercises/${id}`, exercise);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/exercises/${id}`);
  },
};

export const workoutsApi = {
  getAllSessions: async (): Promise<WorkoutSession[]> => {
    const response = await api.get("/workouts/sessions");
    return response.data;
  },

  getSessionById: async (id: string): Promise<WorkoutSession> => {
    const response = await api.get(`/workouts/sessions/${id}`);
    return response.data;
  },

  createSession: async (
    session: CreateWorkoutSessionDto
  ): Promise<WorkoutSession> => {
    const response = await api.post("/workouts/sessions", session);
    return response.data;
  },

  // Método de prueba que no usa base de datos
  createTestSession: async (
    session: CreateWorkoutSessionDto
  ): Promise<WorkoutSession> => {
    const response = await api.post("/workouts/sessions/test-session", session);
    return response.data;
  },

  updateSession: async (
    id: string,
    session: UpdateWorkoutSessionDto
  ): Promise<WorkoutSession> => {
    const response = await api.patch(`/workouts/sessions/${id}`, session);
    return response.data;
  },

  deleteSession: async (id: string): Promise<void> => {
    await api.delete(`/workouts/sessions/${id}`);
  },
};

export const authApi = {
  register: async (userData: RegisterDto): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials: LoginDto): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  refresh: async (): Promise<AuthResponse> => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export const aiApi = {
  generateWorkoutPlan: async (preferences?: any): Promise<AIWorkoutPlan> => {
    const response = await api.post("/ai/workout-plan", preferences);
    return response.data;
  },

  generateNutritionPlan: async (): Promise<AINutritionPlan> => {
    const response = await api.post("/ai/nutrition-plan");
    return response.data;
  },

  getExerciseSuggestions: async (
    muscleGroup: string,
    level: string,
    equipment?: string
  ): Promise<any> => {
    const response = await api.get("/ai/exercise-suggestions", {
      params: { muscleGroup, level, equipment },
    });
    return response.data;
  },
};

export default api;
