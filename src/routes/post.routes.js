import { Router } from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { createPost, deletePost } from "../controllers/post.controllers.js";

const route = Router();

route.post("/post", checkAuth,createPost)
route.delete("/postDelete/:postId", checkAuth,deletePost)

export default route;

