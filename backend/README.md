# FitPlan Pro Backend API

Backend API for FitPlan Pro - AI-powered fitness application built with NestJS, TypeScript, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization** - JWT-based auth with role-based access
- **User Management** - Complete user profiles with fitness data
- **Workout Planning** - Custom and AI-generated workout plans
- **Exercise Library** - Comprehensive exercise database
- **Nutrition Tracking** - Calorie and macro tracking
- **AI Integration** - OpenAI-powered suggestions and plans
- **Progress Tracking** - Detailed fitness progress analytics
- **API Documentation** - Swagger/OpenAPI documentation

## 🛠 Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT + Passport
- **Validation**: Class Validator
- **Documentation**: Swagger
- **AI**: OpenAI GPT-4
- **Package Manager**: Yarn
- **Deployment**: Render

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 15+ (local development)
- Yarn 4.0+
- OpenAI API key (optional, for AI features)

## 🚀 Quick Start

### 1. Clone and Install

\`\`\`bash
git clone <repository-url>
cd fitplan-pro/backend
yarn install
\`\`\`

### 2. Environment Setup

\`\`\`bash
cp .env.example .env

# Edit .env with your configuration

\`\`\`

### 3. Database Setup (Local Development)

\`\`\`bash

# Install PostgreSQL locally

# Create database

createdb fitplan_pro

# Or use a cloud database (recommended)

# Get connection string from your provider

\`\`\`

### 4. Run Migrations

\`\`\`bash
yarn migration:run
\`\`\`

### 5. Seed Database (Optional)

\`\`\`bash
yarn db:seed
\`\`\`

### 6. Start Development Server

\`\`\`bash
yarn start:dev
\`\`\`

The API will be available at \`http://localhost:3001\`
API Documentation: \`http://localhost:3001/api/docs\`

## 📚 Available Scripts

### Development

\`\`\`bash
yarn start:dev # Start development server with hot reload
yarn start:debug # Start with debug mode
yarn build # Build for production
yarn start:prod # Start production server
\`\`\`

### Database

\`\`\`bash
yarn migration:generate # Generate new migration
yarn migration:run # Run pending migrations
yarn migration:revert # Revert last migration
yarn db:seed # Seed database with initial data
yarn db:reset # Reset database (revert + run + seed)
\`\`\`

### Render Deployment

\`\`\`bash
yarn render:build # Build for Render deployment
yarn render:start # Start with migrations for Render
\`\`\`

### Testing

\`\`\`bash
yarn test # Run unit tests
yarn test:watch # Run tests in watch mode
yarn test:cov # Run tests with coverage
yarn test:e2e # Run end-to-end tests
\`\`\`

### Code Quality

\`\`\`bash
yarn lint # Run ESLint
yarn lint --fix # Fix ESLint issues
yarn format # Format code with Prettier
\`\`\`

## 📚 API Endpoints

### Authentication

- \`POST /api/v1/auth/register\` - Register new user
- \`POST /api/v1/auth/login\` - User login
- \`POST /api/v1/auth/refresh\` - Refresh token
- \`POST /api/v1/auth/logout\` - User logout

### Users

- \`GET /api/v1/users/profile\` - Get user profile
- \`PUT /api/v1/users/profile\` - Update user profile
- \`DELETE /api/v1/users/profile\` - Delete user account

### Workouts

- \`GET /api/v1/workouts\` - Get user workouts
- \`POST /api/v1/workouts\` - Create workout plan
- \`PUT /api/v1/workouts/:id\` - Update workout plan
- \`DELETE /api/v1/workouts/:id\` - Delete workout plan

### Exercises

- \`GET /api/v1/exercises\` - Get exercises (with filters)
- \`GET /api/v1/exercises/:id\` - Get exercise details
- \`POST /api/v1/exercises\` - Create custom exercise

### Nutrition

- \`GET /api/v1/nutrition/plan\` - Get nutrition plan
- \`POST /api/v1/nutrition/plan\` - Create/update nutrition plan
- \`POST /api/v1/nutrition/food-entry\` - Log food entry

### AI Features

- \`POST /api/v1/ai/workout-plan\` - Generate AI workout plan
- \`POST /api/v1/ai/nutrition-plan\` - Generate AI nutrition plan
- \`GET /api/v1/ai/exercise-suggestions\` - Get AI exercise suggestions

### Health Check

- \`GET /api/v1/health\` - Application health status

## 🗄️ Database Schema

### Core Entities

- **Users** - User profiles and preferences
- **Exercises** - Exercise library with details
- **WorkoutPlans** - User workout plans
- **WorkoutSessions** - Individual workout sessions
- **NutritionPlans** - User nutrition plans
- **FoodEntries** - Food consumption logs
- **UserProgress** - Progress tracking data

## 🔧 Configuration

### Environment Variables

#### Local Development

\`\`\`env

# Database

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=fitplan_pro

# JWT

JWT_SECRET=your-secret-key

# OpenAI (optional)

OPENAI_API_KEY=your-openai-key

# App

NODE_ENV=development
PORT=3001
\`\`\`

#### Production (Render)

\`\`\`env

# Database (Render provides this)

DATABASE_URL=postgresql://username:password@host:port/database

# JWT

JWT_SECRET=your-super-secure-secret-key

# OpenAI (optional)

OPENAI_API_KEY=your-openai-key

# App

NODE_ENV=production
PORT=10000
\`\`\`

## 🚀 Deployment on Render

### 1. Database Setup

1. Create PostgreSQL database on Render
2. Note the connection details

### 2. Web Service Setup

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: \`backend\`
   - **Build Command**: \`yarn render:build\`
   - **Start Command**: \`yarn render:start\`

### 3. Environment Variables

Set these in Render dashboard:

- \`NODE_ENV=production\`
- \`PORT=10000\`
- \`DATABASE_URL=[your-database-url]\`
- \`JWT_SECRET=[secure-random-string]\`
- \`OPENAI_API_KEY=[your-openai-key]\`

### 4. Health Check

- **Health Check Path**: \`/api/v1/health\`

### 5. Deploy

Push to your main branch and Render will automatically deploy.

## 🧪 Testing

\`\`\`bash

# Unit tests

yarn test

# E2E tests

yarn test:e2e

# Test coverage

yarn test:cov

# Watch mode

yarn test:watch
\`\`\`

## 📈 Performance & Monitoring

- **Rate Limiting** - Throttling protection
- **Validation** - Request/response validation
- **Error Handling** - Comprehensive error handling
- **Logging** - Structured logging
- **Health Checks** - Application health monitoring

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt password hashing
- **Input Validation** - Comprehensive input validation
- **CORS Protection** - Cross-origin request protection
- **Rate Limiting** - API rate limiting
- **SQL Injection Protection** - TypeORM query protection

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed:**

- Verify \`DATABASE_URL\` is correct
- Check if database is running
- Ensure SSL configuration for production

**Migrations Failed:**

- Check database permissions
- Verify migration files exist
- Run migrations manually if needed

**CORS Errors:**

- Update CORS origins in \`main.ts\`
- Verify frontend URL is whitelisted

### Debug Commands

\`\`\`bash

# Check database connection

yarn typeorm query "SELECT NOW()"

# View migration status

yarn typeorm migration:show

# Generate new migration

yarn migration:generate src/migrations/NewMigration
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit changes (\`git commit -m 'Add amazing feature'\`)
4. Push to branch (\`git push origin feature/amazing-feature\`)
5. Open Pull Request

### Development Workflow

\`\`\`bash

# Install dependencies

yarn install

# Start development

yarn start:dev

# Run tests

yarn test

# Build for production

yarn build
\`\`\`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Yarn, NestJS, TypeScript, and deployed on Render**
