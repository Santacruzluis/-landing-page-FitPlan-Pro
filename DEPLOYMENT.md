# 🚀 Deployment Guide - Render

Esta guía te ayudará a desplegar FitPlan Pro en Render de manera fácil y eficiente.

## 📋 Prerrequisitos

- Cuenta en [Render](https://render.com)
- Repositorio en GitHub con el código
- Cuenta en OpenAI (opcional, para funciones de IA)

## 🗄️ 1. Configurar Base de Datos

### Crear PostgreSQL Database

1. Ve a tu dashboard de Render
2. Haz clic en **"New +"** → **"PostgreSQL"**
3. Configura:
   - **Name**: `fitplan-pro-db`
   - **Database**: `fitplan_pro`
   - **User**: `fitplan_user`
   - **Region**: Elige la más cercana
   - **Plan**: Starter (gratis)

4. Haz clic en **"Create Database"**
5. **Guarda la información de conexión** (la necesitarás después)

## ⚙️ 2. Desplegar Backend

### Crear Web Service para Backend

1. En Render dashboard, haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Name**: `fitplan-pro-backend`
   - **Environment**: `Node`
   - **Region**: Misma que la base de datos
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `yarn render:build`
   - **Start Command**: `yarn render:start`

### Variables de Entorno del Backend

En la sección **Environment**, agrega:

\`\`\`env
NODE_ENV=production
PORT=10000
DATABASE_URL=[URL de tu base de datos PostgreSQL]
JWT_SECRET=[Genera una clave secreta larga y segura]
OPENAI_API_KEY=[Tu API key de OpenAI - opcional]
\`\`\`

**Para obtener DATABASE_URL:**
1. Ve a tu base de datos PostgreSQL en Render
2. Copia la **External Database URL**
3. Pégala como valor de `DATABASE_URL`

**Para generar JWT_SECRET:**
\`\`\`bash
# Genera una clave segura
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
\`\`\`

### Configurar Health Check

- **Health Check Path**: `/api/v1/health`

4. Haz clic en **"Create Web Service"**

## 🎨 3. Desplegar Frontend

### Crear Web Service para Frontend

1. En Render dashboard, haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Name**: `fitplan-pro-frontend`
   - **Environment**: `Node`
   - **Region**: Misma que el backend
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `yarn render:build`
   - **Start Command**: `yarn start`

### Variables de Entorno del Frontend

En la sección **Environment**, agrega:

\`\`\`env
NEXT_PUBLIC_API_URL=https://fitplan-pro-backend.onrender.com/api/v1
NEXT_PUBLIC_APP_NAME=FitPlan Pro
NEXT_PUBLIC_APP_VERSION=1.0.0
\`\`\`

**⚠️ Importante**: Reemplaza `fitplan-pro-backend` con el nombre real de tu servicio backend.

4. Haz clic en **"Create Web Service"**

## 🔧 4. Configuración Post-Deployment

### Actualizar CORS en Backend

1. Ve a tu servicio backend en Render
2. En **Environment**, actualiza o agrega:

\`\`\`env
CORS_ORIGINS=https://fitplan-pro-frontend.onrender.com
\`\`\`

3. Redeploy el servicio backend

### Verificar Conexiones

1. **Backend Health Check**: 
   - Ve a `https://tu-backend.onrender.com/api/v1/health`
   - Deberías ver: `{"status":"ok","timestamp":"...","uptime":...}`

2. **Frontend**: 
   - Ve a `https://tu-frontend.onrender.com`
   - La aplicación debería cargar correctamente

3. **API Documentation** (solo en desarrollo):
   - `https://tu-backend.onrender.com/api/docs`

## 🗄️ 5. Poblar Base de Datos

### Ejecutar Migraciones y Seeds

Las migraciones se ejecutan automáticamente al iniciar el backend gracias al comando `yarn render:start`.

Si necesitas ejecutar seeds manualmente:

1. Conecta a tu base de datos usando el **Internal Database URL**
2. O agrega un endpoint temporal en tu backend para ejecutar seeds

## 🔒 6. Configuración de Seguridad

### Variables de Entorno Seguras

- ✅ **JWT_SECRET**: Usa una clave de al menos 64 caracteres
- ✅ **DATABASE_URL**: Render la proporciona automáticamente
- ✅ **OPENAI_API_KEY**: Manténla privada

### CORS Configuration

Asegúrate de que el backend solo permita requests desde tu frontend:

\`\`\`typescript
// En main.ts
app.enableCors({
  origin: [
    "https://tu-frontend.onrender.com",
    // Agrega dominios personalizados aquí
  ],
  credentials: true,
})
\`\`\`

## 📊 7. Monitoreo y Logs

### Ver Logs

1. Ve a tu servicio en Render
2. Haz clic en **"Logs"**
3. Monitorea errores y performance

### Métricas

Render proporciona métricas básicas:
- CPU usage
- Memory usage
- Request count
- Response times

## 🚀 8. Dominios Personalizados (Opcional)

### Configurar Dominio Personalizado

1. Ve a tu servicio en Render
2. Haz clic en **"Settings"**
3. En **"Custom Domains"**, agrega tu dominio
4. Configura los DNS records según las instrucciones

### Actualizar Variables de Entorno

Actualiza las URLs en las variables de entorno:

\`\`\`env
# Frontend
NEXT_PUBLIC_API_URL=https://api.tudominio.com/api/v1

# Backend CORS
CORS_ORIGINS=https://tudominio.com,https://www.tudominio.com
\`\`\`

## 🔄 9. CI/CD Automático

Render automáticamente redeploya cuando haces push a la rama configurada:

1. **Push a GitHub** → **Auto-deploy en Render**
2. **Build automático** con los comandos configurados
3. **Health checks** para verificar que el deploy fue exitoso

## 🐛 10. Troubleshooting

### Problemas Comunes

**Backend no inicia:**
- Verifica que `DATABASE_URL` esté configurada
- Revisa los logs para errores de migración
- Asegúrate de que `PORT=10000`

**Frontend no conecta al backend:**
- Verifica `NEXT_PUBLIC_API_URL`
- Revisa configuración de CORS
- Confirma que el backend esté funcionando

**Base de datos no conecta:**
- Usa la **External Database URL** para `DATABASE_URL`
- Verifica que la base de datos esté en la misma región

### Comandos Útiles

\`\`\`bash
# Ver logs en tiempo real
render logs --service=fitplan-pro-backend --follow

# Redeploy manual
render deploy --service=fitplan-pro-backend

# Verificar variables de entorno
render env --service=fitplan-pro-backend
\`\`\`

## 📈 11. Optimizaciones

### Performance

- **Caching**: Render incluye CDN automático
- **Compression**: Habilitado por defecto
- **SSL**: Certificados automáticos

### Costos

- **Starter Plan**: Gratis con limitaciones
- **Upgrade**: Considera planes pagos para producción
- **Database**: Monitorea uso y considera upgrade si es necesario

## ✅ 12. Checklist Final

- [ ] Base de datos PostgreSQL creada
- [ ] Backend desplegado y funcionando
- [ ] Frontend desplegado y funcionando
- [ ] Variables de entorno configuradas
- [ ] CORS configurado correctamente
- [ ] Health checks funcionando
- [ ] Migraciones ejecutadas
- [ ] Aplicación accesible públicamente

## 🎉 ¡Listo!

Tu aplicación FitPlan Pro ahora está desplegada en Render. 

**URLs de ejemplo:**
- Frontend: `https://fitplan-pro-frontend.onrender.com`
- Backend: `https://fitplan-pro-backend.onrender.com`
- API Docs: `https://fitplan-pro-backend.onrender.com/api/docs`

---

**💡 Tip**: Guarda las URLs y credenciales en un lugar seguro para futuras referencias.
