import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "@/app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // Enable CORS for Render deployment
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://fitplan-pro.onrender.com",
      "https://fitplan-pro-frontend.onrender.com",
      // Agregar tu dominio personalizado aquí
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })

  // API prefix
  app.setGlobalPrefix("api/v1")

  // Health check endpoint
  app.getHttpAdapter().get("/api/v1/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    })
  })

  // Swagger documentation (solo en desarrollo)
  const config = new DocumentBuilder()
    .setTitle("FitPlan Pro API")
    .setDescription("AI-powered fitness application backend API")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("auth", "Authentication endpoints")
    .addTag("users", "User management")
    .addTag("workouts", "Workout management")
    .addTag("exercises", "Exercise library")
    .addTag("nutrition", "Nutrition tracking")
    .addTag("ai", "AI-powered suggestions")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/docs", app, document)

  const port = process.env.PORT || 3001
  await app.listen(port, "0.0.0.0")

  console.log(`🚀 FitPlan Pro API running on: http://localhost:${port}`)
  if (process.env.NODE_ENV !== "production") {
    console.log(`📚 API Documentation: http://localhost:${port}/api/docs`)
  }
}

bootstrap()
