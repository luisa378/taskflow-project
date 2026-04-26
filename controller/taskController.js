import db from '../db.js';

// Función para obtener todas las tareas
export function findAllTask(req, res) {
    console.log('findAllTask taskController');
    
    db.connect()
        .then(function(client) {
            return client.query("SELECT * FROM task ORDER BY id")
                .then(function(result) {
                    console.log("Tareas obtenidas:", result.rows);
                    res.json({ tareas: result.rows });
                    return result;
                })
                .finally(function() {
                    client.release();
                });
        })
        .catch(function(err) {
            console.error('Error al obtener tareas:', err);
            res.status(500).json({ error: "Error al obtener tareas" });
        });
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

// POST /api/task - Editar tarea
export function editTask(req, res) {
    const { id, nombre } = req.body;
    if (!id || isNaN(parseInt(id, 10))) return res.status(400).json({ error: "ID inválido" });
    if (!nombre || nombre.trim() === "") return res.status(400).json({ error: "El nombre de la tarea es requerido" });

    const taskId = parseInt(id, 10);
    db.query("UPDATE task SET name = $1 WHERE id = $2 RETURNING *", [nombre.trim(), taskId])
        .then(result => {
            if (result.rowCount === 0) return res.status(404).json({ error: "Tarea no encontrada" });
            return res.json({ tarea: result.rows[0] });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Error al editar tarea" });
        });
}

export default function (app) {

    // Registrar rutas
    if (!process.env.VERCEL) {
        app.get('/api/task', findAllTask);
        app.put('/api/task', createTask);
        app.post('/api/task', editTask);
        app.delete('/api/task', deleteTask);
    }
}