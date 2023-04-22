import  express  from "express";
import cors from "cors";
import morgan from "morgan";
import calendarRoute from "./routes/calendar.routes.js";
import cellRoute from "./routes/cells.routes.js";
import taskRoute from "./routes/tasks.routes.js";
import imageRoute from "./routes/image.routes.js";
import userRoute from "./routes/user.routes.js";
import pictureRoute from "./routes/picture.routes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(calendarRoute);
app.use(cellRoute);
app.use(taskRoute);
app.use(imageRoute);
app.use(userRoute);
app.use(pictureRoute);


export default app;