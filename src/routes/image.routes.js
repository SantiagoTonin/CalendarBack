import { Router } from "express";
import { upload } from "../middleware/image.middleware.js";
import { deleteImage } from "../middleware/errorImageDelete.middleware.js";
import { getImages,getImage,createImages,deleteImages,upgradeImages } from "../controllers/image.controllers.js";

const route = Router();

route.get("/image",getImages)
route.post("/image",upload.array("images",3),deleteImage,createImages)
route.get("/image/:id",getImage)
route.put("/image/:id",upload.array("images",3),upgradeImages)
route.delete("/image/:path",deleteImages)

export default route;