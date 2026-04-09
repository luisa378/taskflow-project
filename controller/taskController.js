import db from '../db.js';

// Función para obtener todas las tareas
export async function findAllTask(req, res) {

     console.log('findAllTask taskController');
    const client = await db.connect();
    try {
        const result = await client.query("SELECT * FROM task ORDER BY id");
        console.log("Tareas obtenidas:", result.rows);
        return res.json({ tareas: result.rows });
    } catch (err) {
        console.error('Error al obtener tareas:', err);
        return res.status(500).json({ error: "Error al obtener tareas" });
    } finally {
        client.release();
    }
}

// POST /api/task
export function createTask(req, res) {
    const { nombre } = req.body;
    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre de la tarea es requerido" });
    }

    db.query("INSERT INTO task (name) VALUES ($1) RETURNING *", [nombre.trim()])
        .then(result => res.status(201).json({ tarea: result.rows[0] }))
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: "Error al guardar la tarea" });
        });
}

// DELETE /api/task?id=
export function deleteTask(req, res) {
    const id = parseInt(req.query.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    db.query("DELETE FROM task WHERE id = $1 RETURNING *", [id])
        .then(result => {
            if (result.rowCount === 0) return res.status(404).json({ error: "Tarea no encontrada" });
            return res.json({ tarea: result.rows[0] });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Error al eliminar tarea" });
        });
}

export default function (app) {

    // Registrar rutas
    if (!process.env.VERCEL) {
        app.get('/api/task', findAllTask);
        app.put('/api/task', createTask);
        app.delete('/api/task', deleteTask);
    }
}