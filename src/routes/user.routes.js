import { Router } from "express";
import {
  getUsers,
  getUser,
  upgrateUser,
  createUser,
  singIn,
  deleteUser,
  apiComplete,
} from "../controllers/user.controllers.js";

const routes = Router();

routes.get("/user/api",apiComplete);
routes.get("/user",getUsers);
routes.post("/singup",createUser);
routes.post("/singin",singIn)
routes.get("/user/:id",getUser);
routes.put("/user/:id",upgrateUser);
routes.delete("/user/:id",deleteUser);

export default routes;
