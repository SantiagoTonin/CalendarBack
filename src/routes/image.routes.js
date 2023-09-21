import { Router } from "express";
import { upload } from "../middleware/image.middleware.js";
import { deleteImage } from "../middleware/errorImageDelete.middleware.js";
import { getImages,getImage,createImages,deleteImages,upgradeImages } from "../controllers/image.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import { authRoleAuthorized } from "../middleware/roleAuth.middleware.js";

const route = Router();

route.get("/image",authRoleAuthorized,getImages)
route.post("/image",checkAuth,upload.array("image",3),deleteImage,createImages)
route.get("/image/:id",getImage)
route.put("/image/:id",checkAuth,upload.array("image",3),upgradeImages)
route.delete("/image/:path",checkAuth,deleteImages)

export default route;