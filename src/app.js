import  express  from "express";
import cors from "cors";
import morgan from "morgan";
import calendarRoute from "./routes/calendar.routes.js";
import cellRoute from "./routes/cells.routes.js";
import taskRoute from "./routes/tasks.routes.js";
import imageRoute from "./routes/image.routes.js";
import userRoute from "./routes/user.routes.js";
import pictureRoute from "./routes/picture.routes.js";
import dateRoutes from "./routes/date.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import postRoutes from "./routes/post.routes.js"
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use('/image', express.static('image'));
app.use('/ProfilePicture', express.static( 'ProfilePicture'));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(calendarRoute);
app.use(cellRoute);
app.use(taskRoute);
app.use(imageRoute);
app.use(userRoute);
app.use(pictureRoute);
app.use(dateRoutes);
app.use(adminRoutes);
app.use(postRoutes);




export default app; 