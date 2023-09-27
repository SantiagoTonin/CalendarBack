import { Router } from "express";
import { upload,handleUploadError } from "../middleware/picture.middleware.js";
import { deleteImage } from "../middleware/errorImageDelete.middleware.js";
import {
  getPictures,
  getPicture,
  createPicture,
  DeletePictures,
  upgratePicture,
} from "../controllers/picture.controllers.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import { authRoleAuthorized } from "../middleware/roleAuth.middleware.js";

const route = Router();

route.get("/picture",authRoleAuthorized,getPictures);
route.post('/picture', upload.single('picture'), handleUploadError,deleteImage,checkAuth, createPicture);
route.get("/picture/:id",checkAuth,getPicture);
route.put("/picture/:id",checkAuth,upgratePicture);
route.delete("/picture/:path",checkAuth,DeletePictures);

export default route;
