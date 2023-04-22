import { Router } from "express";
import { upload } from "../middleware/picture.middleware.js";
import { deleteImage } from "../middleware/errorImageDelete.middleware.js";
import {
  getPictures,
  getPicture,
  createPicture,
  DeletePictures,
  upgratePicture,
} from "../controllers/picture.controllers.js";

const route = Router();

route.get("/picture",getPictures);
route.post("/picture",upload,deleteImage,createPicture);
route.get("/picture/:id",getPicture);
route.put("/picture/:id",upgratePicture);
route.delete("/picture/:path",DeletePictures);

export default route;
