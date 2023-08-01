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
  passwordChangeRequest
} from "../controllers/user.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import { authRoleAuthorized } from "../middleware/roleAuth.middleware.js";

const routes = Router();

routes.get("/user/api",authRoleAuthorized,apiComplete);
routes.get("/user",authRoleAuthorized,getUsers);
routes.post("/singup",createUser);
routes.post("/singin",singIn)
routes.get("/user/:id",checkAuth,getUser);
routes.put("/user/:id",checkAuth,upgrateUser);
routes.delete("/user/:id",authRoleAuthorized,deleteUser);
routes.get("/user/checkEmail/:token",checkMailboxStatus);
routes.post("/user/recoveryPassword",passwordRecoveryRequest)

export default routes;
