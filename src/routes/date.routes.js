import { Router } from "express";
import { getExactDate } from "../controllers/dateControllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const routes = Router();

routes.get('/api/v1/CelltsDate',getExactDate);

export default routes;