import express from "express";
import { createPost, getAllPosts, getPost } from "../controllers/Post.js";
import multer from "multer";


const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.get("/blogs", getAllPosts);
router.get("/blog/:id", getPost);
router.post("/add",upload.single('image'), createPost);

export default router;
