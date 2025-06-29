"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dumbbell,
  Plus,
  Search,
  Filter,
  Target,
  TrendingUp,
  Edit,
  Trash2,
  Play,
  Eye,
  Heart,
  Share,
  Download,
  Upload,
  Settings,
  BarChart3,
  Users,
  Activity,
  Zap,
  SortAsc,
  SortDesc,
  Grid,
  List,
  BookOpen,
  Clock,
  Star,
  Award,
  Trophy,
  Medal,
  Crown,
  Flame,
  Zap as Lightning,
  Brain,
  Sparkles,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Progress } from "../../../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { exercisesApi, Exercise } from "../../../lib/api";
import { aiApi } from "../../../lib/api";

export default function ExercisesPage() {
  const [selectedMuscle, setSelectedMuscle] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar ejercicios al montar el componente
  useEffect(() => {
    loadExercises();
  }, []);

  // Filtrar ejercicios cuando cambien los filtros
  useEffect(() => {
    filterExercises();
  }, [exercises, selectedMuscle, selectedLevel, searchTerm]);

  const loadExercises = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await exercisesApi.getAll();
      setExercises(data);
    } catch (err: any) {
      console.error("Error loading exercises:", err);
      // Si es un error 404 o no hay datos, no mostrar error
      if (err.response?.status === 404 || err.response?.status === 500) {
        setExercises([]);
        setError(null);
      } else {
        setError("Error al cargar los ejercicios");
      }
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = () => {
    let filtered = exercises;

    // Filtrar por grupo muscular
    if (selectedMuscle !== "all") {
      filtered = filtered.filter(
        (exercise) =>
          exercise.muscleGroup.toLowerCase() === selectedMuscle.toLowerCase()
      );
    }

    // Filtrar por nivel
    if (selectedLevel !== "all") {
      filtered = filtered.filter(
        (exercise) =>
          exercise.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredExercises(filtered);
  };

  const generateAISuggestions = async () => {
    setIsGenerating(true);

    try {
      const suggestions = await aiApi.getExerciseSuggestions(
        selectedMuscle !== "all" ? selectedMuscle : "chest",
        selectedLevel !== "all" ? selectedLevel : "beginner"
      );

      if (suggestions.suggestions) {
        setAiSuggestions(suggestions.suggestions);
      } else {
        // Fallback si no hay sugerencias
        setAiSuggestions([
          "Para principiantes en pecho: Comienza con flexiones en pared, luego flexiones de rodillas",
          "Progresión recomendada: Flexiones → Press con mancuernas → Press de banca",
          "Tip: Mantén la espalda recta y controla el movimiento en ambas fases",
          "Frecuencia óptima: Entrena pecho 2-3 veces por semana con al menos 48h de descanso",
        ]);
      }
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
      // Fallback a sugerencias predefinidas
      setAiSuggestions([
        "Para principiantes en pecho: Comienza con flexiones en pared, luego flexiones de rodillas",
        "Progresión recomendada: Flexiones → Press con mancuernas → Press de banca",
        "Tip: Mantén la espalda recta y controla el movimiento en ambas fases",
        "Frecuencia óptima: Entrena pecho 2-3 veces por semana con al menos 48h de descanso",
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
      case "principiante":
        return "bg-green-600/20 text-green-300 border-green-600/30";
      case "intermediate":
      case "intermedio":
        return "bg-yellow-600/20 text-yellow-300 border-yellow-600/30";
      case "advanced":
      case "avanzado":
        return "bg-red-600/20 text-red-300 border-red-600/30";
      default:
        return "bg-gray-600/20 text-gray-300 border-gray-600/30";
    }
  };

  const getLevelDisplayName = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "Principiante";
      case "intermediate":
        return "Intermedio";
      case "advanced":
        return "Avanzado";
      default:
        return level;
    }
  };

  const getMuscleGroupDisplayName = (muscleGroup: string) => {
    switch (muscleGroup.toLowerCase()) {
      case "chest":
        return "Pecho";
      case "back":
        return "Espalda";
      case "shoulders":
        return "Hombros";
      case "arms":
        return "Brazos";
      case "legs":
        return "Piernas";
      case "core":
        return "Core";
      case "cardio":
        return "Cardio";
      case "full_body":
        return "Cuerpo Completo";
      default:
        return muscleGroup;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-400" />
          <p className="text-gray-500 dark:text-gray-300">
            Cargando ejercicios...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={loadExercises}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  // Mostrar mensaje cuando no hay ejercicios
  if (!loading && exercises.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                FitPlan Pro
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="text-gray-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/calendar"
                className="text-gray-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Calendario
              </Link>
              <Link
                href="/dashboard/calculator"
                className="text-gray-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Calculadora
              </Link>
              <Link
                href="/dashboard/exercises"
                className="text-slate-900 dark:text-white font-medium"
              >
                Ejercicios
              </Link>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
              <Dumbbell className="mr-3 h-10 w-10 text-purple-400" />
              Biblioteca de Ejercicios
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-lg">
              Explora y descubre ejercicios para todos los niveles
            </p>
          </div>

          {/* Empty State */}
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Dumbbell className="h-12 w-12 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              No hay ejercicios disponibles
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mb-8 max-w-md mx-auto">
              La biblioteca de ejercicios está vacía. Contacta al administrador
              para agregar ejercicios.
            </p>

            <Button
              onClick={loadExercises}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              FitPlan Pro
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-gray-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/calendar"
              className="text-gray-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Calendario
            </Link>
            <Link
              href="/dashboard/calculator"
              className="text-gray-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Calculadora
            </Link>
            <Link
              href="/dashboard/exercises"
              className="text-slate-900 dark:text-white font-medium"
            >
              Ejercicios
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
            <Brain className="mr-3 h-10 w-10 text-pink-400" />
            Ejercicios con IA
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-lg">
            Descubre ejercicios personalizados y recibe sugerencias inteligentes
          </p>
        </div>

        {/* AI Suggestions Card */}
        <Card className="mb-8 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-600/20 dark:to-purple-600/20 border-pink-200 dark:border-pink-600/30">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-pink-400" />
              Sugerencias de IA
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-300">
              Obtén recomendaciones personalizadas basadas en tu nivel y
              objetivos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={generateAISuggestions}
                disabled={isGenerating}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generando...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generar Sugerencias
                  </>
                )}
              </Button>
            </div>

            {aiSuggestions.length > 0 && (
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-3 border-l-4 border-pink-400"
                  >
                    <p className="text-gray-300">{suggestion}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8 bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar ejercicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400"
                />
              </div>

              <Select value={selectedMuscle} onValueChange={setSelectedMuscle}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Grupo muscular" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  <SelectItem value="all">Todos los músculos</SelectItem>
                  <SelectItem value="chest">Pecho</SelectItem>
                  <SelectItem value="back">Espalda</SelectItem>
                  <SelectItem value="legs">Piernas</SelectItem>
                  <SelectItem value="shoulders">Hombros</SelectItem>
                  <SelectItem value="arms">Brazos</SelectItem>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="full_body">Cuerpo Completo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Nivel" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  <SelectItem value="all">Todos los niveles</SelectItem>
                  <SelectItem value="beginner">Principiante</SelectItem>
                  <SelectItem value="intermediate">Intermedio</SelectItem>
                  <SelectItem value="advanced">Avanzado</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Target className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exercises Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{exercise.name}</CardTitle>
                  <Badge className={getLevelBadgeColor(exercise.level)}>
                    {getLevelDisplayName(exercise.level)}
                  </Badge>
                </div>
                <CardDescription className="text-gray-300">
                  {getMuscleGroupDisplayName(exercise.muscleGroup)} •{" "}
                  {exercise.equipment}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{exercise.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <Clock className="mr-1 h-4 w-4" />
                    {exercise.caloriesPerMinute} cal/min
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <BarChart3 className="mr-1 h-4 w-4" />
                    Ver detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No se encontraron ejercicios
              </h3>
              <p className="text-gray-300">
                Intenta ajustar los filtros o términos de búsqueda
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
