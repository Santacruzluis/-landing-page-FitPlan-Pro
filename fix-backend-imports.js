const fs = require("fs");
const path = require("path");

// Función para convertir @/ a rutas relativas
function fixImports(content, filePath) {
  // Obtener la profundidad del archivo desde src
  const relativePath = path.relative("backend/src", filePath);
  const depth = relativePath.split(path.sep).length - 1;

  // Crear el prefijo de ruta relativa
  const prefix = "../".repeat(depth);

  // Reemplazar las importaciones @/
  return content.replace(/@\//g, `${prefix}`);
}

// Función para procesar un archivo
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const fixedContent = fixImports(content, filePath);

    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, "utf8");
      console.log(`✅ Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Función para procesar directorios recursivamente
function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (
      stat.isDirectory() &&
      !file.startsWith(".") &&
      file !== "node_modules"
    ) {
      processDirectory(filePath);
    } else if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
      processFile(filePath);
    }
  });
}

// Procesar el directorio backend/src
console.log("🔧 Fixing import paths in backend...");
processDirectory("backend/src");
console.log("✅ Done!");
