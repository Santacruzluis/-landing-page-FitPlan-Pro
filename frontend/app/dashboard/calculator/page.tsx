"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import {
  Calculator,
  Dumbbell,
  Target,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";

export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activity: "",
    goal: "",
  });

  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    goalCalories: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null>(null);

  const calculateCalories = () => {
    if (
      !formData.age ||
      !formData.weight ||
      !formData.height ||
      !formData.gender ||
      !formData.activity ||
      !formData.goal
    ) {
      return;
    }

    const age = Number.parseInt(formData.age);
    const weight = Number.parseFloat(formData.weight);
    const height = Number.parseFloat(formData.height);

    // Calcular BMR usando la fórmula de Mifflin-St Jeor
    let bmr: number;
    if (formData.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Factores de actividad
    const activityFactors: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    const tdee = bmr * activityFactors[formData.activity];

    // Ajustar calorías según objetivo
    let goalCalories: number;
    if (formData.goal === "lose") {
      goalCalories = tdee - 500; // Déficit de 500 calorías
    } else if (formData.goal === "gain") {
      goalCalories = tdee + 300; // Superávit de 300 calorías
    } else {
      goalCalories = tdee; // Mantenimiento
    }

    // Calcular macronutrientes
    const protein = weight * 2.2; // 2.2g por kg de peso
    const fats = (goalCalories * 0.25) / 9; // 25% de calorías de grasas
    const carbs = (goalCalories - protein * 4 - fats * 9) / 4; // Resto en carbohidratos

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
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
              className="text-slate-900 dark:text-white font-medium"
            >
              Calculadora
            </Link>
            <Link
              href="/dashboard/exercises"
              className="text-gray-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
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
            <Calculator className="mr-3 h-10 w-10 text-blue-400" />
            Calculadora Nutricional
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-lg">
            Calcula tus calorías y macronutrientes personalizados
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">
                Información Personal
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-300">
                Completa tus datos para obtener cálculos precisos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="age"
                    className="text-slate-900 dark:text-white"
                  >
                    Edad
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-900 dark:text-white">
                    Género
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10">
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="weight"
                    className="text-slate-900 dark:text-white"
                  >
                    Peso (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="height"
                    className="text-slate-900 dark:text-white"
                  >
                    Altura (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                    className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-900 dark:text-white">
                  Nivel de Actividad
                </Label>
                <Select
                  value={formData.activity}
                  onValueChange={(value) =>
                    setFormData({ ...formData, activity: value })
                  }
                >
                  <SelectTrigger className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">
                    <SelectValue placeholder="Seleccionar nivel" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10">
                    <SelectItem value="sedentary">
                      Sedentario (poco o nada de ejercicio)
                    </SelectItem>
                    <SelectItem value="light">
                      Ligero (ejercicio ligero 1-3 días/semana)
                    </SelectItem>
                    <SelectItem value="moderate">
                      Moderado (ejercicio moderado 3-5 días/semana)
                    </SelectItem>
                    <SelectItem value="active">
                      Activo (ejercicio intenso 6-7 días/semana)
                    </SelectItem>
                    <SelectItem value="very_active">
                      Muy activo (ejercicio muy intenso, trabajo físico)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-slate-900 dark:text-white">
                  Objetivo
                </Label>
                <RadioGroup
                  value={formData.goal}
                  onValueChange={(value) =>
                    setFormData({ ...formData, goal: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="lose"
                      id="lose"
                      className="border-white/20 text-purple-400"
                    />
                    <Label
                      htmlFor="lose"
                      className="text-slate-900 dark:text-white flex items-center"
                    >
                      <TrendingDown className="mr-2 h-4 w-4 text-red-400" />
                      Perder peso
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="maintain"
                      id="maintain"
                      className="border-white/20 text-purple-400"
                    />
                    <Label
                      htmlFor="maintain"
                      className="text-slate-900 dark:text-white flex items-center"
                    >
                      <Target className="mr-2 h-4 w-4 text-blue-400" />
                      Mantener peso
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="gain"
                      id="gain"
                      className="border-white/20 text-purple-400"
                    />
                    <Label
                      htmlFor="gain"
                      className="text-slate-900 dark:text-white flex items-center"
                    >
                      <TrendingUp className="mr-2 h-4 w-4 text-green-400" />
                      Ganar peso/músculo
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                onClick={calculateCalories}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Calcular Calorías
              </Button>
            </CardContent>
          </Card>

          {/* Resultados */}
          {results && (
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-600/30">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">
                    Tus Resultados
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-300">
                    Calorías y macronutrientes personalizados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {results.bmr}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        BMR (Metabolismo Basal)
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {results.tdee}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        TDEE (Gasto Total)
                      </p>
                    </div>
                  </div>
                  <div className="text-center border-t border-white/10 pt-4">
                    <p className="text-3xl font-bold text-purple-300">
                      {results.goalCalories}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300">
                      Calorías para tu objetivo
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">
                    Macronutrientes Diarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-400">
                        {results.protein}g
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Proteínas
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-400">
                        {results.carbs}g
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Carbohidratos
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-400">
                        {results.fats}g
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Grasas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">
                    Recomendaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-gray-500 dark:text-gray-300">
                    <p>
                      • Consume {results.protein}g de proteína distribuida en
                      4-5 comidas
                    </p>
                    <p>• Bebe al menos 2-3 litros de agua al día</p>
                    <p>• Ajusta las porciones según tu progreso semanal</p>
                    <p>• Incluye vegetales en cada comida principal</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
