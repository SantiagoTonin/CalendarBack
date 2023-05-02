import { Router } from "express";
import {
  getTasks,
  getTask,
  deleteTask,
  upgradeTask,
  createTask,
} from "../controllers/tasks.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import { authRoleAuthorized } from "../middleware/roleAuth.middleware.js";

const route = Router();

route.get("/tasks",authRoleAuthorized, getTasks);
route.post("/tasks",checkAuth, createTask);
route.get("/tasks/:id",checkAuth, getTask);
route.put("/tasks/:id",checkAuth, upgradeTask);
route.delete("/tasks/:id",checkAuth, deleteTask);

export default route;
