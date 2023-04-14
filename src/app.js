import  express  from "express";
import cors from "cors";
import morgan from "morgan";
import calendarRoute from "./routes/calendar.routes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(calendarRoute);

export default app;