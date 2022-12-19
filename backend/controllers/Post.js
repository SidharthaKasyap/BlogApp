import { Post } from "../models/post.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(500).json({
        success: false,
        message: "No blogs",
      });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createPost = async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file.path;

    if (!title || !description || !image) {
      return res.status(500).json({
        success: false,
        message: "input missing",
      });
    }

    const newPost = new Post({
      title,
      description,
      image,
    });
    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Blog added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
