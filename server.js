import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import taskController from "./controller/taskController.js";

// Cargar variables de entorno según entorno
dotenv.config({
    path: "development"
});

// Crear __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar app
const app = express();

// Middlewares
app.use(express.json()); // reemplaza body-parser
app.use(express.static(path.join(__dirname, "public")));

taskController(app);

// Arranque local
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor local en http://localhost:${PORT}`));
}

