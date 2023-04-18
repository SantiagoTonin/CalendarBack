import { Router } from "express";
import { upload } from "../middleware/image.middleware.js";

const route = Router();

route.get("/image",)
route.post("/image",upload.array("image",5),)
route.get("/image/:id",)
route.put("/image/:id",)
route.delete("/image/:id",)

export default route;