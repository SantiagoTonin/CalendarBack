import { Router } from "express";
import {
  getExactDate,
  getDataBetweenUsers,
  getDataUser,
  getDataByCell,
  getDataByArrayDate,
  dataPostsByCalendarId 
} from "../controllers/dateControllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const routes = Router();

routes.get("/api/v1/CelltsDate", getExactDate);
routes.get("/api/v1/getDataUser/info", getDataUser);
routes.post("/api/v1/DataBetweenUsers", getDataBetweenUsers);
routes.post("/api/v1/getDataByCell", getDataByCell);
routes.post("/api/v1/getDataByArrayDate", getDataByArrayDate);
routes.post("/api/v1/getDataByPost",  dataPostsByCalendarId);

export default routes;
