import { Router } from "express";
import {getCalendars,createCalendar} from "../controllers/calendar.controllers.js"

const route = Router();

route.get('/calendar',getCalendars);
route.post('/calendar',createCalendar);
route.get('/calendar/:id',)
route.delete('/calendar/:id',)
route.put('/calendar/:id',)

export default route;