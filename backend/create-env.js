const fs = require("fs");
const path = require("path");

const envContent = `# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=fitplan_pro

# JWT Configuration
JWT_SECRET=fitplan-pro-secret-key-change-this-in-production

# OpenAI Configuration (optional)
OPENAI_API_KEY=your-openai-api-key

# Application Configuration
NODE_ENV=development
PORT=3001

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
`;

const envPath = path.join(__dirname, ".env");

try {
  fs.writeFileSync(envPath, envContent);
  console.log("✅ Archivo .env creado exitosamente!");
  console.log("📁 Ubicación:", envPath);
} catch (error) {
  console.error("❌ Error creando archivo .env:", error.message);
}
