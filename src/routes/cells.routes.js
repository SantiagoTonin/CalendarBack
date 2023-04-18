import { Router } from "express";
import { getCells,getCell, createCells, deleteCell, updateCell } from "../controllers/cells.controllers.js";

const route = Router();

route.get("/cells",getCells)
route.post("/cells",createCells)
route.get("/cells/:id",getCell)
route.put("/cells/:id",updateCell)
route.delete("/cells/:id",deleteCell)

export default route;