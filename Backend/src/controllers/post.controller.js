import { Post } from "../models/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const newPost = await Post.create({
            content,
            author: req.user._id
        });

        const populatedPost = await Post.findById(newPost._id).populate('author', 'username fullname');

        res.status(201).json({
            message: "Post created successfully",
            post: populatedPost
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username fullname')
            .sort({ createdAt: -1 });

        res.status(200).json({
            posts
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
