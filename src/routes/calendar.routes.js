import { Router } from "express";
import {
  getCalendars,
  createCalendar,
  deleteInfoCalendar,
  upgradeCalendar,
  getCalendar,
  allInfoCalendars
} from "../controllers/calendar.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import { authRoleAuthorized } from "../middleware/roleAuth.middleware.js";

const route = Router();

route.get("/calendar",authRoleAuthorized, getCalendars);
route.post("/calendar",checkAuth, createCalendar);
route.get("/calendar/:id",checkAuth,getCalendar);
route.put("/calendar/:id",checkAuth, upgradeCalendar);
route.delete("/deleteCalendar/:id",checkAuth, deleteInfoCalendar);
route.get("/allInfo",authRoleAuthorized, allInfoCalendars);

export default route;
