import  express  from "express";
import cors from "cors";
import morgan from "morgan";
import calendarRoute from "./routes/calendar.routes.js";
import cellRoute from "./routes/cells.routes.js";
import taskRoute from "./routes/tasks.routes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(calendarRoute);
app.use(cellRoute);
app.use(taskRoute);

export default app;