import { findAllTask, createTask, deleteTask } from '../controller/taskController.js'

export default async function handler(req, res) {
    try {
        console.log('Method: ' + req.method);

        if (req.method === "GET") {

            console.log('findAllTask vercel');
            return await findAllTask(req, res);
        }

        if (req.method === "PUT") {
            console.log('createTask vercel');

            return await createTask(req, res);
        }

        if (req.method === "DELETE") {
            console.log('deleteTask vercel');
            return await deleteTask(req, res);
        }

        // Si otro método
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error interno" });
    }
}