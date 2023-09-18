import { Router } from "express";
import {
  getCells,
  getCell,
  createCells,
  deleteCell,
  updateCell,
  getImageCells,
} from "../controllers/cells.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import { authRoleAuthorized } from "../middleware/roleAuth.middleware.js";
const route = Router();

route.get("/cells", authRoleAuthorized, getCells);
route.post("/cells",  createCells);
route.get("/cells/:id", checkAuth, getCell);
route.put("/cells/:id", checkAuth, updateCell);
route.delete("/cells/:id", checkAuth, deleteCell);
route.get("/cellsImg", checkAuth, getImageCells);

export default route;
