import { Router } from "express";
import {
  getUsers,
  getUser,
  upgrateUser,
  createUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const routes = Router();

routes.get("/user",getUsers);
routes.post("/user",createUser);
routes.get("/user/:id",getUser);
routes.put("/user/:id",upgrateUser);
routes.delete("/user/:id",deleteUser);

export default routes;
