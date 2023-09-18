import { Router } from "express";
import {
  getUsers,
  getUser,
  upgrateUser,
  createUser,
  singIn,
  deleteUser,
  apiComplete,
  checkMailboxStatus,
  passwordRecoveryRequest,
  passwordChangeRequest,
  infoUsers
} from "../controllers/user.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import { authRoleAuthorized } from "../middleware/roleAuth.middleware.js";

const routes = Router();

routes.get("/user/api",apiComplete);
routes.get("/user",getUsers);
routes.post("/signup",createUser);
routes.post("/singin",singIn)
routes.get("/user/:id",getUser); //se desabilito el check para agilizar algunas cosas
routes.put("/user/:id",upgrateUser);
routes.delete("/user/:id",deleteUser);
routes.get("/user/checkEmail/:token",checkMailboxStatus);
routes.post("/user/recoveryPassword",passwordRecoveryRequest);
routes.post("/user/recoveryPassword/:token",passwordChangeRequest);
routes.post("/user/info",infoUsers);

export default routes;
