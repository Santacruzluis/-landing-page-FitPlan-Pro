"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dumbbell,
  Plus,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  X,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Users,
  Activity,
  Zap,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  PlayCircle,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  workoutsApi,
  WorkoutSession,
  CreateWorkoutSessionDto,
} from "../../../lib/api";
import { toast } from "sonner";

export default function WorkoutsPage() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSession, setNewSession] = useState<CreateWorkoutSessionDto>({
    workoutPlanId: "default",
    scheduledDate: new Date().toISOString().split("T")[0],
    actualDurationMinutes: 45,
    notes: "",
  });

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await workoutsApi.getAllSessions();
      setSessions(data);
    } catch (err: any) {
      console.error("Error loading sessions:", err);
      if (err.response?.status === 404 || err.response?.status === 500) {
        setSessions([]);
        setError(null);
      } else {
        setError("Error al cargar las rutinas");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async () => {
    try {
      await workoutsApi.createSession(newSession);
      toast.success("Rutina creada exitosamente");
      setIsCreateDialogOpen(false);
      setNewSession({
        workoutPlanId: "default",
        scheduledDate: new Date().toISOString().split("T")[0],
        actualDurationMinutes: 45,
        notes: "",
      });
      loadSessions();
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error("Error al crear la rutina");
    }
  };

  const handleDeleteSession = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta rutina?")) {
      try {
        await workoutsApi.deleteSession(id);
        toast.success("Rutina eliminada exitosamente");
        loadSessions();
      } catch (error) {
        console.error("Error deleting session:", error);
        toast.error("Error al eliminar la rutina");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 dark:bg-green-600/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-600/30">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completada
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-blue-100 dark:bg-blue-600/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-600/30">
            <PlayCircle className="mr-1 h-3 w-3" />
            En Progreso
          </Badge>
        );
      case "planned":
        return (
          <Badge className="bg-yellow-100 dark:bg-yellow-600/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-600/30">
            <Calendar className="mr-1 h-3 w-3" />
            Planificada
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 dark:bg-gray-600/20 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600/30">
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-400" />
          <p className="text-gray-500 dark:text-gray-300">
            Cargando rutinas...
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
            onClick={loadSessions}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (!loading && sessions.length === 0) {
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
                className="text-gray-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Ejercicios
              </Link>
              <Link
                href="/dashboard/workouts"
                className="text-slate-900 dark:text-white font-medium"
              >
                Rutinas
              </Link>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                <Target className="mr-3 h-10 w-10 text-purple-400" />
                Mis Rutinas
              </h1>
              <p className="text-gray-500 dark:text-gray-300 text-lg">
                Gestiona y revisa tus entrenamientos realizados
              </p>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-12 w-12 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              No hay rutinas registradas
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Comienza registrando tu primera rutina para llevar un seguimiento
              de tus entrenamientos.
            </p>

            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Registrar Primera Rutina
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-slate-900 dark:text-white">
                    Registrar Nueva Rutina
                  </DialogTitle>
                  <DialogDescription className="text-gray-500 dark:text-gray-300">
                    Registra una nueva sesión de entrenamiento
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="date"
                      className="text-slate-900 dark:text-white"
                    >
                      Fecha
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newSession.scheduledDate}
                      onChange={(e) =>
                        setNewSession({
                          ...newSession,
                          scheduledDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="duration"
                      className="text-slate-900 dark:text-white"
                    >
                      Duración (minutos)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newSession.actualDurationMinutes}
                      onChange={(e) =>
                        setNewSession({
                          ...newSession,
                          actualDurationMinutes: parseInt(e.target.value) || 45,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="notes"
                      className="text-slate-900 dark:text-white"
                    >
                      Notas
                    </Label>
                    <Textarea
                      id="notes"
                      value={newSession.notes}
                      onChange={(e) =>
                        setNewSession({ ...newSession, notes: e.target.value })
                      }
                      placeholder="Describe tu entrenamiento..."
                      rows={3}
                    />
                  </div>
                  <Button
                    onClick={handleCreateSession}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Registrar Rutina
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
              className="text-gray-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Ejercicios
            </Link>
            <Link
              href="/dashboard/workouts"
              className="text-slate-900 dark:text-white font-medium"
            >
              Rutinas
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
              <Target className="mr-3 h-10 w-10 text-purple-400" />
              Mis Rutinas
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-lg">
              Gestiona y revisa tus entrenamientos realizados
            </p>
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Rutina
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10">
              <DialogHeader>
                <DialogTitle className="text-slate-900 dark:text-white">
                  Crear Nueva Rutina
                </DialogTitle>
                <DialogDescription className="text-slate-600 dark:text-gray-300">
                  Registra una nueva sesión de entrenamiento
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="date"
                    className="text-slate-900 dark:text-white"
                  >
                    Fecha
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newSession.scheduledDate}
                    onChange={(e) =>
                      setNewSession({
                        ...newSession,
                        scheduledDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="duration"
                    className="text-slate-900 dark:text-white"
                  >
                    Duración (minutos)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newSession.actualDurationMinutes}
                    onChange={(e) =>
                      setNewSession({
                        ...newSession,
                        actualDurationMinutes: parseInt(e.target.value) || 45,
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="notes"
                    className="text-slate-900 dark:text-white"
                  >
                    Notas
                  </Label>
                  <Textarea
                    id="notes"
                    value={newSession.notes}
                    onChange={(e) =>
                      setNewSession({ ...newSession, notes: e.target.value })
                    }
                    placeholder="Describe tu entrenamiento..."
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleCreateSession}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Crear Rutina
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sessions Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <Card
              key={session.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-slate-900 dark:text-white">
                    {formatDate(session.scheduledDate)}
                  </CardTitle>
                  {getStatusBadge(session.status)}
                </div>
                <CardDescription className="text-gray-500 dark:text-gray-300">
                  {session.notes || "Sin descripción"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="mr-2 h-4 w-4" />
                    {session.actualDurationMinutes || 0} minutos
                  </div>
                  {session.caloriesBurned && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Target className="mr-2 h-4 w-4" />
                      {session.caloriesBurned} calorías quemadas
                    </div>
                  )}
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteSession(session.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-600/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
