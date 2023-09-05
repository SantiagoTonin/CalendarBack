import { Router } from "express";
import { createAdmin } from "../controllers/admin.controllers.js";

const routes = Router();

routes.post('/createAdmin', createAdmin);

export default routes;