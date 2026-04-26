# 📦 Comandos básicos de Vercel CLI

## 📑 Índice

- [🧠 Node.js: funcionamiento en local vs Vercel](#-nodejs-funcionamiento-en-local-vs-vercel)
- [🗄️ Base de datos: PostgreSQL en local y en Vercel (Supabase)](#️-base-de-datos-postgresql-en-local-y-en-vercel-supabase)
- [🔐 vercel login](#-vercel-login)
- [🔗 vercel link](#-vercel-link)
- [🌱 vercel env pull](#-vercel-env-pull)
- [🚀 vercel --prod](#-vercel---prod)
- [🧠 Resumen rápido](#-resumen-rápido)

---

## 🧠 Node.js: funcionamiento en local vs Vercel

Antes de ver los comandos, es importante entender cómo funciona Node.js en ambos entornos.

### 🖥️ En local
- Ejecutas tu aplicación directamente con Node.js (`node`, `npm run dev`, etc.).
- El servidor está **siempre activo** mientras lo ejecutes.
- Tú controlas el entorno (variables, puertos, dependencias, etc.).
- Ejemplo típico:
```bash
npm run dev
```

### ☁️ En Vercel
- No hay un servidor tradicional siempre corriendo.
- Vercel usa un modelo **serverless (funciones)**:
  - Tu código se ejecuta **solo cuando hay una petición**.
  - Cada endpoint puede convertirse en una función independiente.
- Vercel se encarga de:
  - Escalar automáticamente
  - Gestionar el despliegue
  - Configurar el entorno

👉 En resumen:
- Local = servidor persistente  
- Vercel = ejecución bajo demanda (serverless)

---

## 🗄️ Base de datos: PostgreSQL en local y en Vercel (Supabase)

### 🖥️ En local
- La aplicación utiliza **PostgreSQL** corriendo en local (por ejemplo, con Docker o instalación nativa).
- La conexión suele apuntar a `localhost`.
- Baja latencia porque todo ocurre en la misma máquina o red local.

### ☁️ En Vercel (con Supabase)
- En producción se utiliza **Supabase**, que internamente también usa PostgreSQL.
- La base de datos está alojada en la nube, en una **región específica**.
- La aplicación desplegada en Vercel se conecta remotamente a esa base de datos.

### ⚠️ Importante: latencia y regiones
- Si la región de Vercel y la de Supabase **no coinciden**, aumenta la latencia.
- Esto puede afectar significativamente al rendimiento (consultas más lentas).

👉 Recomendación:
- Alinear la región del proyecto en Vercel con la región de Supabase.
- Ejemplo: ambos en `eu-west` o similar.

👉 En resumen:
- Local = PostgreSQL local (latencia mínima)  
- Producción = Supabase (PostgreSQL en la nube)  
- Clave = mantener **misma región** para evitar latencias

---

## 🔐 `vercel login`

Permite autenticarte en tu cuenta de Vercel desde la terminal.

### ¿Qué hace?
- Inicia sesión en tu cuenta de Vercel.
- Vincula la CLI con tu usuario.
- Necesario antes de ejecutar otros comandos que requieren autenticación.

### Uso:
```bash
vercel login
```

### Qué ocurre:
- Se te pedirá introducir tu email.
- Recibirás un enlace o código para completar el login.

---

## 🔗 `vercel link`

Conecta un proyecto local con un proyecto existente en Vercel.

### ¿Qué hace?
- Vincula tu carpeta local a un proyecto en Vercel.
- Crea o actualiza el archivo `.vercel/project.json`.
- Permite que los despliegues se asocien correctamente.

### Uso:
```bash
vercel link
```

### Qué ocurre:
- Te pedirá seleccionar o crear un proyecto.
- Guardará la configuración localmente.

---

## 🌱 `vercel env pull`

Descarga las variables de entorno de Vercel a un archivo local.

### ¿Qué hace?
- Sincroniza variables de entorno desde Vercel.
- Crea un archivo `.env` local.
- Muy útil para desarrollo local con las mismas variables del entorno remoto.

### Uso:
```bash
vercel env pull
```

### Opcional:
Puedes especificar entorno:
```bash
vercel env pull .env.local
```

### Qué ocurre:
- Descarga variables de entorno (Development, Preview, Production).
- Las guarda en el archivo indicado.

---

## 🚀 `vercel --prod`

Realiza un despliegue en producción.

### ¿Qué hace?
- Despliega tu proyecto directamente al entorno de producción.
- Omite el entorno de preview.

### Uso:
```bash
vercel --prod
```

### Qué ocurre:
- Se construye el proyecto.
- Se publica en la URL de producción.
- Reemplaza la versión activa en producción.

---

## 🧠 Resumen rápido

| Comando              | Función principal                          |
|---------------------|-------------------------------------------|
| `vercel login`      | Iniciar sesión en Vercel                  |
| `vercel link`       | Vincular proyecto local con Vercel        |
| `vercel env pull`   | Descargar variables de entorno            |
| `vercel --prod`     | Desplegar directamente a producción       |