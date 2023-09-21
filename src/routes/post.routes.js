import { Router } from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { createPost } from "../controllers/post.controllers.js";

const route = Router();

route.post("/post", checkAuth,createPost)

export default route;

