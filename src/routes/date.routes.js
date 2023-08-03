import { Router } from "express";
import { getExactDate,getDataBetweenUsers } from "../controllers/dateControllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const routes = Router();

routes.get('/api/v1/CelltsDate',getExactDate);
routes.post('/api/v1/DataBetweenUsers',getDataBetweenUsers);

export default routes;