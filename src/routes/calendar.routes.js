import { Router } from "express";
import {
  getCalendars,
  createCalendar,
  deleteInfoCalendar,
  upgradeCalendar,
  getCalendar
} from "../controllers/calendar.controllers.js";

const route = Router();

route.get("/calendar", getCalendars);
route.post("/calendar", createCalendar);
route.get("/calendar/:id",getCalendar);
route.put("/calendar/:id", upgradeCalendar);
route.delete("/deleteCalendar/:id", deleteInfoCalendar);

export default route;
