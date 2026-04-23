import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.route('/create').post(authMiddleware, createPost);
router.route('/all').get(getAllPosts);

export default router;
