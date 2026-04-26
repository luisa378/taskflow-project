import { findAllTask, createTask, deleteTask, editTask } from '../controller/taskController.js'

export default function handler(req, res) {
    console.log('Method: ' + req.method);

    if (req.method === "GET") {
        console.log('findAllTask vercel');
        return findAllTask(req, res);
    }

    if (req.method === "PUT") {
        console.log('createTask vercel');
        return createTask(req, res);
    }

    if (req.method === "POST") {
        console.log('editTask vercel');
        return editTask(req, res);
    }

    if (req.method === "DELETE") {
        console.log('deleteTask vercel');
        return deleteTask(req, res);
    }

    // Si otro método
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}