# FitPlan Pro - Aplicación Fitness con IA

Una aplicación completa de fitness que combina planificación de entrenamientos, seguimiento de progreso y recomendaciones personalizadas con Inteligencia Artificial.

## 🚀 Características Principales

- **Planificación Inteligente**: Calendario de rutinas con IA
- **Biblioteca de Ejercicios**: Más de 50 ejercicios categorizados
- **Calculadora Nutricional**: Cálculo de calorías y macronutrientes
- **Seguimiento de Progreso**: Registro de sesiones y estadísticas
- **IA Personalizada**: Sugerencias adaptadas a tu nivel
- **Interfaz Moderna**: Diseño responsive y intuitivo

## 🛠️ Tecnologías

### Backend

- **NestJS** - Framework de Node.js
- **TypeORM** - ORM para base de datos
- **PostgreSQL** - Base de datos principal
- **JWT** - Autenticación
- **OpenAI API** - Inteligencia Artificial

### Frontend

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Shadcn/ui** - Componentes UI
- **Axios** - Cliente HTTP

## 📦 Instalación

### Prerrequisitos

- Node.js 18+
- PostgreSQL
- Yarn o npm

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd prueba-tecnica
```

### 2. Configurar Backend

```bash
cd backend
cp env.example .env
```

Editar `.env` con tus credenciales:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu_password
DATABASE_NAME=fitplan_pro
OPENAI_API_KEY=tu_api_key_opcional
```

### 3. Instalar dependencias

```bash
# Backend
cd backend
yarn install

# Frontend
cd ../frontend
yarn install
```

### 4. Configurar Base de Datos

```bash
cd backend

# Crear base de datos
createdb fitplan_pro

# Ejecutar migraciones
yarn migration:run

# Poblar con datos de ejemplo (IMPORTANTE)
yarn seed
```

### 5. Ejecutar la aplicación

```bash
# Terminal 1 - Backend
cd backend
yarn start:dev

# Terminal 2 - Frontend
cd frontend
yarn dev
```

## 🗄️ Base de Datos

### Datos de Ejemplo

La aplicación incluye datos de ejemplo para que puedas probar todas las funcionalidades:

- **Ejercicios**: 5 ejercicios básicos (Push-ups, Squats, Pull-ups, Plank, Deadlift)
- **Plan de Entrenamiento**: Plan semanal de ejemplo
- **Sesiones**: 5 sesiones de entrenamiento realizadas

### Si la base de datos está vacía

Si ves mensajes como "No hay rutinas programadas" o "No hay ejercicios disponibles", ejecuta:

```bash
cd backend
yarn seed
```

Esto poblará la base de datos con datos de ejemplo.

## 🎯 Funcionalidades

### Dashboard Principal

- Vista general de entrenamientos
- Crear rutinas personalizadas
- Generar rutinas con IA
- Iniciar entrenamientos
- Sesiones recientes

### Calendario

- ✅ **Crear rutinas** - Programar nuevas sesiones
- ✅ **Editar rutinas** - Modificar fechas y detalles
- ✅ **Eliminar rutinas** - Cancelar sesiones
- ✅ **Estados visuales** - Planificada, En Progreso, Completada
- ✅ **Estadísticas** - Total de rutinas y tiempo

### Ejercicios

- ✅ **Biblioteca completa** - Más de 50 ejercicios
- ✅ **Filtros avanzados** - Por grupo muscular y nivel
- ✅ **Búsqueda** - Encontrar ejercicios específicos
- ✅ **Sugerencias de IA** - Recomendaciones personalizadas
- ✅ **Información detallada** - Instrucciones y músculos objetivo

### Workouts (Rutinas)

- ✅ **Listar sesiones** - Ver todas las rutinas realizadas
- ✅ **Crear sesiones** - Registrar nuevos entrenamientos
- ✅ **Eliminar sesiones** - Borrar registros
- ✅ **Estados** - Completada, En Progreso, Planificada
- ✅ **Detalles** - Duración, calorías, notas

### Calculadora Nutricional

- ✅ **Cálculo de calorías** - BMR y TDEE
- ✅ **Macronutrientes** - Proteínas, carbohidratos, grasas
- ✅ **Objetivos** - Pérdida, mantenimiento, ganancia
- ✅ **Factores de actividad** - Sedentario a muy activo

## 🔧 Configuración de IA

La funcionalidad de IA es **opcional**. Si no configuras la API key de OpenAI:

- Las sugerencias de IA mostrarán recomendaciones predefinidas
- La generación de rutinas usará ejercicios de la biblioteca
- La aplicación funcionará completamente sin IA

Para habilitar IA completa:

```env
OPENAI_API_KEY=tu_api_key_de_openai
```

## 🚀 Despliegue

### Render (Recomendado)

1. Conectar repositorio a Render
2. Configurar variables de entorno
3. El build automático ejecutará migraciones y seed

### Variables de entorno para producción

```env
DATABASE_URL=postgresql://user:pass@host:port/db
OPENAI_API_KEY=opcional
NODE_ENV=production
```

## 📱 Uso

1. **Acceder**: Ve a `http://localhost:3000`
2. **Dashboard**: Revisa tu resumen de entrenamientos
3. **Calendario**: Programa y gestiona tus rutinas
4. **Ejercicios**: Explora la biblioteca de ejercicios
5. **Workouts**: Registra tus sesiones realizadas
6. **Calculadora**: Calcula tus necesidades nutricionales

## 🐛 Solución de Problemas

### Base de datos vacía

```bash
cd backend
yarn seed
```

### Error de conexión a BD

- Verificar credenciales en `.env`
- Asegurar que PostgreSQL esté ejecutándose
- Verificar que la base de datos existe

### Error de CORS

- El backend está configurado para `localhost:3000`
- Verificar que el frontend esté en el puerto correcto

### IA no funciona

- Verificar API key de OpenAI
- La aplicación funciona sin IA
- Usar recomendaciones predefinidas

## 🤖 Inteligencia Artificial en el Desarrollo

El desarrollo de FitPlan Pro no solo integra IA en sus funcionalidades para el usuario final, sino que también ha sido impulsado por herramientas de Inteligencia Artificial en cada etapa del proceso de creación. Esto permitió acelerar el desarrollo, mejorar la calidad del código y lograr un diseño moderno y funcional. A continuación, te explico cómo cada IA contribuyó al proyecto:

### 1. Generación de la Base del Código — **Vercel v0**

Para sentar las bases del proyecto, se utilizó **Vercel v0**, una IA especializada en la generación de código boilerplate y estructuras iniciales. Gracias a esta herramienta, se pudo crear rápidamente la arquitectura principal tanto del frontend como del backend, asegurando buenas prácticas desde el inicio y permitiendo enfocarse en la lógica de negocio y las funcionalidades clave.

### 2. Diseño de la Interfaz — **Stich**

El diseño visual y la experiencia de usuario fueron potenciados con **Stich**, una IA enfocada en la creación de interfaces atractivas y modernas. Stich ayudó a definir paletas de colores, disposición de componentes y estilos visuales, logrando una interfaz intuitiva, coherente y agradable para el usuario, alineada con las tendencias actuales de diseño.

### 3. Refactorización y Mejora de Código — **Cursor AI**

Durante el desarrollo, la mejora continua del código fue posible gracias a la IA integrada en el editor de código **Cursor**. Esta IA asistió en la refactorización, sugerencias de optimización, generación de fragmentos de código y detección de posibles errores, permitiendo mantener un código limpio, eficiente y fácil de mantener.

### 🌟 Impacto de las IAs en el Proyecto

El uso de estas herramientas de Inteligencia Artificial tuvo un impacto significativo en el desarrollo de FitPlan Pro:

- **Agilidad:** Reducción del tiempo de desarrollo al automatizar tareas repetitivas y complejas.
- **Calidad:** Generación de código más robusto y con menos errores desde el inicio.
- **Innovación:** Incorporación de tendencias modernas en diseño y arquitectura.
- **Enfoque:** Permite dedicar más tiempo a la lógica de negocio y la experiencia del usuario.

Gracias a la colaboración entre el desarrollador y estas IAs, FitPlan Pro es un ejemplo de cómo la inteligencia artificial puede potenciar el trabajo humano y llevar los proyectos a un nuevo nivel de excelencia.

## 📄 Licencia

Este proyecto es parte de una prueba técnica y está diseñado para demostrar habilidades de desarrollo full-stack.

## 👨‍💻 Autor

Desarrollado con ❤️ para demostrar capacidades en:

- Desarrollo full-stack
- Integración de APIs
- Manejo de bases de datos
- Implementación de IA
- Diseño de UX/UI

## 🟣 Comportamiento de los datos en el backend

### Modo híbrido: datos reales y datos de ejemplo

- **Si hay rutinas guardadas en la base de datos:**  
  El endpoint `/workouts/sessions` devuelve los datos reales de la base de datos y la aplicación muestra solo tus rutinas reales.

- **Si la base de datos está vacía o no está conectada:**  
  El endpoint devuelve datos de ejemplo (mock) para que la aplicación siempre funcione y se vea bien, incluso en modo demo o desarrollo.

- **Transición automática:**  
  No necesitas cambiar nada en el código. Cuando guardes rutinas reales, el sistema dejará de mostrar los datos de ejemplo y solo mostrará tus rutinas reales.

### Ventajas

- Siempre hay algo que mostrar en la interfaz, incluso en modo demo.
- Ideal para pruebas, presentaciones y desarrollo sin base de datos.
- Cuando conectes la base de datos y guardes rutinas reales, la app se adapta automáticamente.
