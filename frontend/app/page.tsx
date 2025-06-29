import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Dumbbell,
  Calculator,
  Brain,
  Users,
  Trophy,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              FitPlan Pro
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Características
            </Link>
            <Link
              href="#how-it-works"
              className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cómo Funciona
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </nav>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/dashboard">Comenzar Gratis</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-600/30">
            🚀 Potenciado por Inteligencia Artificial
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Tu Entrenador
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}
              Personal{" "}
            </span>
            Inteligente
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Planifica tus rutinas, calcula tus calorías y recibe sugerencias
            personalizadas con IA. Todo en una plataforma diseñada para llevarte
            al siguiente nivel.
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
            >
              <Link href="/dashboard">
                Empezar Ahora <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Todo lo que necesitas para entrenar
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Herramientas inteligentes que se adaptan a tu nivel y objetivos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Calendar className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-slate-900 dark:text-white">
                  Planificación Inteligente
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-300">
                  Organiza tus rutinas semanales con un calendario intuitivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Rutinas personalizadas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Recordatorios automáticos
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Brain className="h-12 w-12 text-pink-400 mb-4" />
                <CardTitle className="text-slate-900 dark:text-white">
                  IA Personalizada
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-300">
                  Sugerencias inteligentes basadas en tu nivel y objetivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Ejercicios adaptativos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Planes alimenticios
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-white/5 border-slate-200/50 dark:border-white/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Calculator className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-slate-900 dark:text-white">
                  Calculadora Nutricional
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-300">
                  Calcula tus calorías y macros según tus objetivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Pérdida de peso
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Ganancia muscular
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Cómo funciona
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-lg">
              Tres simples pasos para transformar tu entrenamiento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                1. Define tu perfil
              </h3>
              <p className="text-slate-600 dark:text-gray-300">
                Indica tu nivel (principiante, intermedio, avanzado) y objetivos
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                2. Planifica tu semana
              </h3>
              <p className="text-slate-600 dark:text-gray-300">
                Organiza tus entrenamientos en el calendario inteligente
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                3. Entrena y progresa
              </h3>
              <p className="text-slate-600 dark:text-gray-300">
                Sigue tus rutinas personalizadas y alcanza tus metas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            ¿Listo para transformar tu entrenamiento?
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a miles de personas que ya están alcanzando sus objetivos con
            FitPlan Pro
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-12 py-4"
          >
            <Link href="/dashboard">
              Comenzar Gratis Ahora <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 dark:border-white/10 bg-black/40 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Dumbbell className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              FitPlan Pro
            </span>
          </div>
          <p className="text-slate-500 dark:text-gray-400">
            © 2024 FitPlan Pro. Transformando vidas a través del fitness
            inteligente.
          </p>
        </div>
      </footer>
    </div>
  );
}
