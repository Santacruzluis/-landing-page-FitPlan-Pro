"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "../../components/ui/button";
import {
  Dumbbell,
  Sun,
  Moon,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Play,
  Plus,
  X,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Users,
  Activity,
  Zap,
  Calculator,
  Edit,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { workoutsApi, aiApi, WorkoutSession } from "../../lib/api";
import { toast } from "sonner";

export default function DashboardPage() {
  const [todayWorkout, setTodayWorkout] = useState({
    day: "Lunes",
    muscle: "Pecho y Tríceps",
    exercises: ["Press de banca", "Flexiones", "Extensiones de tríceps"],
    duration: "45 min",
    isCustom: false,
  });

  const [nextWorkout, setNextWorkout] = useState({
    day: "Martes",
    muscle: "Espalda y Bíceps",
    exercises: ["Dominadas", "Remo con barra", "Curl de bíceps", "Martillo"],
    duration: "50 min",
  });

  const [recentSessions, setRecentSessions] = useState<WorkoutSession[]>([]);
  const [completedDays, setCompletedDays] = useState<string[]>(["Lun"]); // Días completados
  const [usingRealData, setUsingRealData] = useState(false); // Si estamos usando datos reales

  // Cargar sesiones recientes al montar el componente
  useEffect(() => {
    loadRecentSessions();
  }, []);

  const loadRecentSessions = async () => {
    try {
      const sessions = await workoutsApi.getAllSessions();
      setRecentSessions(sessions.slice(0, 5)); // Solo las últimas 5

      // Actualizar días completados basado en las sesiones
      if (sessions && sessions.length > 0) {
        const completed = sessions.map((session) => {
          // Usar endTime si existe, sino scheduledDate
          const date = new Date(session.endTime || session.scheduledDate);
          const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
          return days[date.getDay()];
        });

        // Filtrar días únicos y actualizar
        const uniqueCompletedDays = [...new Set(completed)];
        setCompletedDays(uniqueCompletedDays);
        setUsingRealData(true); // Usando datos reales

        console.log(
          "Días completados actualizados desde BD:",
          uniqueCompletedDays
        );
      } else {
        // Si no hay datos en la BD, usar datos predefinidos
        console.log("No hay datos en la BD, usando datos predefinidos");
        setCompletedDays(["Lun"]); // Solo Lunes como completado por defecto
        setUsingRealData(false); // Usando datos predefinidos
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
      // Si hay error, usar datos predefinidos
      setCompletedDays(["Lun"]);
      setUsingRealData(false); // Usando datos predefinidos
    }
  };

  const completeWorkout = async () => {
    try {
      // Crear una nueva sesión de entrenamiento completada
      const newSession: any = {
        workoutPlanId: "default",
        scheduledDate: new Date().toISOString().split("T")[0],
        actualDurationMinutes: parseInt(todayWorkout.duration) || 45,
        notes: `Entrenamiento completado: ${todayWorkout.muscle}`,
      };

      await workoutsApi.createTestSession(newSession);
      toast.success("¡Entrenamiento completado! 🎉");

      // Recargar sesiones para actualizar el resumen semanal
      await loadRecentSessions();

      // Mostrar el siguiente entrenamiento
      showNextWorkout();
    } catch (error: any) {
      console.error("Error completing workout:", error);
      toast.error("Error al completar el entrenamiento");
    }
  };

  const showNextWorkout = () => {
    // Lista de entrenamientos predefinidos
    const nextWorkouts = [
      {
        day: "Martes",
        muscle: "Espalda y Bíceps",
        exercises: [
          "Dominadas",
          "Remo con barra",
          "Curl de bíceps",
          "Martillo",
        ],
        duration: "50 min",
      },
      {
        day: "Miércoles",
        muscle: "Piernas",
        exercises: ["Sentadillas", "Peso muerto", "Prensa", "Extensiones"],
        duration: "60 min",
      },
      {
        day: "Jueves",
        muscle: "Hombros",
        exercises: [
          "Press militar",
          "Elevaciones laterales",
          "Pájaros",
          "Encogimientos",
        ],
        duration: "40 min",
      },
      {
        day: "Viernes",
        muscle: "Cardio",
        exercises: ["Correr", "Bicicleta", "Saltos", "Burpees"],
        duration: "30 min",
      },
    ];

    // Seleccionar el siguiente entrenamiento
    const randomNextWorkout =
      nextWorkouts[Math.floor(Math.random() * nextWorkouts.length)];

    // Mover el entrenamiento actual al próximo
    setNextWorkout(todayWorkout);

    // Establecer el nuevo entrenamiento actual
    setTodayWorkout({
      day: randomNextWorkout.day,
      muscle: randomNextWorkout.muscle,
      exercises: randomNextWorkout.exercises,
      duration: randomNextWorkout.duration,
      isCustom: false,
    });

    toast.info(
      `Próximo entrenamiento: ${randomNextWorkout.muscle} (${randomNextWorkout.day})`
    );
  };

  const weekPlan = useMemo(
    () => [
      {
        day: "Lun",
        muscle: "Pecho y Tríceps",
        completed: completedDays.includes("Lun"),
      },
      {
        day: "Mar",
        muscle: "Espalda y Bíceps",
        completed: completedDays.includes("Mar"),
      },
      {
        day: "Mié",
        muscle: "Piernas",
        completed: completedDays.includes("Mié"),
      },
      {
        day: "Jue",
        muscle: "Hombros",
        completed: completedDays.includes("Jue"),
      },
      {
        day: "Vie",
        muscle: "Cardio",
        completed: completedDays.includes("Vie"),
      },
      {
        day: "Sáb",
        muscle: "Descanso",
        completed: completedDays.includes("Sáb"),
      },
      {
        day: "Dom",
        muscle: "Descanso",
        completed: completedDays.includes("Dom"),
      },
    ],
    [completedDays]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              FitPlan Pro
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-slate-900 dark:text-white font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/calendar"
              className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Calendario
            </Link>
            <Link
              href="/dashboard/calculator"
              className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Calculadora
            </Link>
            <Link
              href="/dashboard/exercises"
              className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Ejercicios
            </Link>
          </nav>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-600 dark:text-gray-300"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            ¡Hola! 💪
          </h1>
          <p className="text-slate-600 dark:text-gray-300 text-lg">
            Aquí tienes tu entrenamiento de hoy. ¡Completa y pasa al siguiente!
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-600/10 dark:to-indigo-600/10 border-blue-200 dark:border-blue-600/30">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  💡 ¿Quieres planificar tus rutinas?
                </h3>
                <p className="text-slate-600 dark:text-gray-300 text-sm">
                  Puedes crear, modificar y organizar tu calendario de
                  entrenamiento completo. Usa "Planificar Rutinas" para crear
                  nuevas rutinas o "Ver Calendario" para revisar tu historial.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Workout */}
        <Card className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-600/20 dark:to-pink-600/20 border-purple-200 dark:border-purple-600/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-900 dark:text-white text-2xl flex items-center">
                  Entrenamiento de Hoy
                </CardTitle>
                <CardDescription className="text-slate-700 dark:text-gray-300 text-lg">
                  {todayWorkout.day} - {todayWorkout.muscle}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 dark:bg-green-600/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-600/30">
                  {todayWorkout.duration}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              <p className="text-slate-600 dark:text-gray-300 mb-3">
                <strong>Ejercicios a realizar:</strong>
              </p>
              {todayWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="flex items-center text-slate-700 dark:text-gray-300"
                >
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3"></div>
                  {exercise}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={completeWorkout}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg"
              >
                ✅ Marcar como Completado
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Workout Preview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-600/10 dark:to-indigo-600/10 border-blue-200 dark:border-blue-600/30">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white text-xl flex items-center">
              🎯 Próximo Entrenamiento
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-gray-300">
              Esto es lo que te espera para tu siguiente sesión
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white/50 dark:bg-white/5 rounded-lg p-4 border border-blue-100 dark:border-blue-600/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {nextWorkout.day} - {nextWorkout.muscle}
                </h3>
                <Badge className="bg-blue-100 dark:bg-blue-600/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-600/30">
                  {nextWorkout.duration}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-gray-300 mb-2">
                  <strong>Ejercicios:</strong>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {nextWorkout.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-slate-700 dark:text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></div>
                      {exercise}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <Link href="/dashboard/calendar">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-slate-900 dark:text-white">
                  Planificar Rutinas
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-300">
                  Crea y modifica tu calendario de entrenamiento
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <Link href="/dashboard/calendar">
              <CardHeader className="text-center">
                <Edit className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-slate-900 dark:text-white">
                  Ver Calendario
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-300">
                  Revisa tu historial de entrenamientos
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <Link href="/dashboard/calculator">
              <CardHeader className="text-center">
                <Calculator className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <CardTitle className="text-slate-900 dark:text-white">
                  Calculadora
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-300">
                  Calcula tus calorías y macros
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>

        {/* Weekly Overview */}
        <Card className="bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-900 dark:text-white">
                  Resumen Semanal
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-300">
                  Tu plan de entrenamiento para esta semana
                  {!usingRealData && (
                    <span className="ml-2 text-xs text-orange-600 dark:text-orange-400">
                      (Datos de ejemplo)
                    </span>
                  )}
                </CardDescription>
              </div>
              <Badge className="bg-green-100 dark:bg-green-600/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-600/30">
                {completedDays.length}/7 días completados
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {weekPlan.map((day, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      day.completed
                        ? "bg-green-100 dark:bg-green-600/20 border-2 border-green-300 dark:border-green-600/50"
                        : day.day === "Lun"
                        ? "bg-purple-100 dark:bg-purple-600/20 border-2 border-purple-300 dark:border-purple-600/50"
                        : "bg-slate-100 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        day.completed
                          ? "text-green-700 dark:text-green-300"
                          : day.day === "Lun"
                          ? "text-purple-700 dark:text-purple-300"
                          : "text-slate-600 dark:text-gray-300"
                      }`}
                    >
                      {day.day}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-gray-400">
                    {day.muscle}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
