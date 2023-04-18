import { Router } from "express";
import {
  getTasks,
  getTask,
  deleteTask,
  upgradeTask,
  createTask,
} from "../controllers/tasks.controllers.js";

const route = Router();

route.get("/tasks", getTasks);
route.post("/tasks", createTask);
route.get("/tasks/:id", getTask);
route.put("/tasks/:id", upgradeTask);
route.delete("/tasks/:id", deleteTask);

export default route;
