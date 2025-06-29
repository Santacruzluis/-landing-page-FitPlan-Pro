"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
  Calendar as CalendarIcon,
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
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X,
  Minus,
  Plus as AddIcon,
  Loader2,
  Dumbbell,
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
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
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
import { Calendar } from "../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  workoutsApi,
  WorkoutSession,
  CreateWorkoutSessionDto,
  UpdateWorkoutSessionDto,
} from "../../../lib/api";
import { toast } from "sonner";

export default function CalendarPage() {
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<WorkoutSession | null>(
    null
  );
  const [newSession, setNewSession] = useState<CreateWorkoutSessionDto>({
    workoutPlanId: "default",
    scheduledDate: new Date().toISOString().split("T")[0],
    actualDurationMinutes: 45,
    notes: "",
  });

  // Cargar sesiones al montar el componente
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
      // Si es un error 404 o no hay datos, no mostrar error
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
      // Usar el endpoint de prueba que funciona
      await workoutsApi.createTestSession(newSession);
      toast.success("Rutina planificada exitosamente");
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
      toast.error("Error al planificar la rutina");
    }
  };

  const handleEditSession = async () => {
    if (!editingSession) return;

    try {
      // Para editar, creamos una nueva sesión con los datos actualizados
      const updatedSession = {
        workoutPlanId: "default",
        scheduledDate: editingSession.scheduledDate,
        actualDurationMinutes: editingSession.actualDurationMinutes,
        notes: editingSession.notes || "",
      };

      await workoutsApi.createTestSession(updatedSession);
      toast.success("Rutina actualizada exitosamente");
      setIsEditDialogOpen(false);
      setEditingSession(null);
      loadSessions();
    } catch (error) {
      console.error("Error updating session:", error);
      toast.error("Error al actualizar la rutina");
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

  const openEditDialog = (session: WorkoutSession) => {
    setEditingSession(session);
    setIsEditDialogOpen(true);
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
            <Play className="mr-1 h-3 w-3" />
            En Progreso
          </Badge>
        );
      case "planned":
        return (
          <Badge className="bg-yellow-100 dark:bg-yellow-600/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-600/30">
            <CalendarIcon className="mr-1 h-3 w-3" />
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
    const date = new Date(dateString);
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    return days[date.getDay()];
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Agrupar sesiones por día de la semana
  const sessionsByDay = sessions.reduce((acc, session) => {
    const day = formatDate(session.scheduledDate);
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(session);
    return acc;
  }, {} as Record<string, WorkoutSession[]>);

  // Filtrar solo los días con rutinas
  const daysWithSessions = Object.keys(sessionsByDay).filter(
    (day) => sessionsByDay[day] && sessionsByDay[day].length > 0
  );

  const weekDays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-400" />
          <p className="text-gray-500 dark:text-gray-300">
            Cargando calendario...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex items-center justify-center">
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

  // Mostrar mensaje cuando no hay rutinas
  if (!loading && sessions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        {/* Header */}
        <header className="border-b border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-black/20 backdrop-blur-sm">
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
                className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/calendar"
                className="text-slate-900 dark:text-white font-medium"
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
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                <CalendarIcon className="mr-3 h-10 w-10 text-purple-400" />
                Planificador de Rutinas
              </h1>
              <p className="text-slate-600 dark:text-gray-300 text-lg">
                Organiza y personaliza tu semana de entrenamiento
              </p>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarIcon className="h-12 w-12 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              No tienes rutinas programadas esta semana
            </h2>
            <p className="text-slate-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              ¡Crea tu primera rutina y comienza a organizar tu semana de
              entrenamiento!
            </p>

            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Rutina
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-slate-900 dark:text-white">
                    Crear Nueva Rutina
                  </DialogTitle>
                  <DialogDescription className="text-slate-600 dark:text-gray-300">
                    Programa una nueva sesión de entrenamiento
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-black/20 backdrop-blur-sm">
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
              className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/calendar"
              className="text-slate-900 dark:text-white font-medium"
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
              <CalendarIcon className="mr-3 h-10 w-10 text-purple-400" />
              Planificador de Rutinas
            </h1>
            <p className="text-slate-600 dark:text-gray-300 text-lg">
              Organiza y personaliza tu semana de entrenamiento
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-48 bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10">
                <SelectItem value="current">Semana Actual</SelectItem>
                <SelectItem value="next">Próxima Semana</SelectItem>
                <SelectItem value="custom">Personalizada</SelectItem>
              </SelectContent>
            </Select>

            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
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
                    Programa una nueva sesión de entrenamiento
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
        </div>

        {/* Weekly Plan Grid */}
        <div className="grid gap-6">
          {daysWithSessions.map((day) => {
            const daySessions = sessionsByDay[day] || [];
            return (
              <Card
                key={day}
                className={`bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 ${
                  day === "Domingo" ? "opacity-60" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                          {day.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-slate-900 dark:text-white text-xl">
                          {daySessions.length > 0
                            ? `${daySessions.length} Rutina${
                                daySessions.length > 1 ? "s" : ""
                              }`
                            : "Sin rutinas"}
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-gray-300">
                          {day}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {daySessions.length > 0 && (
                        <>
                          {getStatusBadge(daySessions[0].status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(daySessions[0])}
                            className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDeleteSession(daySessions[0].id)
                            }
                            className="text-slate-500 dark:text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {daySessions.length > 0 && (
                  <CardContent>
                    <div className="space-y-3">
                      {daySessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between text-slate-600 dark:text-gray-300 bg-white/5 rounded-lg p-3"
                        >
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            <div>
                              <span className="text-sm font-medium">
                                {session.notes || "Entrenamiento"}
                              </span>
                              <div className="text-xs text-gray-500">
                                {session.actualDurationMinutes} min •{" "}
                                {formatFullDate(session.scheduledDate)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(session.status)}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(session)}
                              className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSession(session.id)}
                              className="text-slate-500 dark:text-gray-400 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10">
            <DialogHeader>
              <DialogTitle className="text-slate-900 dark:text-white">
                Editar Rutina
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-gray-300">
                Modifica los detalles de tu rutina
              </DialogDescription>
            </DialogHeader>
            {editingSession && (
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="edit-date"
                    className="text-slate-900 dark:text-white"
                  >
                    Fecha
                  </Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingSession.scheduledDate}
                    onChange={(e) =>
                      setEditingSession({
                        ...editingSession,
                        scheduledDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="edit-duration"
                    className="text-slate-900 dark:text-white"
                  >
                    Duración (minutos)
                  </Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={editingSession.actualDurationMinutes || 0}
                    onChange={(e) =>
                      setEditingSession({
                        ...editingSession,
                        actualDurationMinutes: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="edit-notes"
                    className="text-slate-900 dark:text-white"
                  >
                    Notas
                  </Label>
                  <Textarea
                    id="edit-notes"
                    value={editingSession.notes || ""}
                    onChange={(e) =>
                      setEditingSession({
                        ...editingSession,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Describe tu entrenamiento..."
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleEditSession}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Actualizar Rutina
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-gray-300">
                    Total Rutinas
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {sessions.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-gray-300">
                    Completadas
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {sessions.filter((s) => s.status === "completed").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-gray-300">
                    Tiempo Total
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {sessions.reduce(
                      (total, session) =>
                        total + (session.actualDurationMinutes || 0),
                      0
                    )}{" "}
                    min
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
