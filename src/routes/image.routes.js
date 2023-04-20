import { Router } from "express";
import { upload } from "../middleware/image.middleware.js";
import { getImages,getImage,createImages,deleteImages,upgradeImages } from "../controllers/image.controllers.js";

const route = Router();

route.get("/image",getImages)
route.post("/image",upload.array("images",3),createImages)
route.get("/image/:id",getImage)
route.put("/image/:id",upgradeImages)
route.delete("/image/:path",deleteImages)

export default route;