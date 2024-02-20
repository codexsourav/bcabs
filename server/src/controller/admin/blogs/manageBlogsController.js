// @ts-check 

import { BlogModel } from "../../../db/models/blogs/blogsSchema";

export const newBlogPost = async (req, res) => {
    const { title, description, keywords, image, content } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    if (!description) {
        return res.status(400).json({ message: 'Description is required' });
    }

    if (!keywords) {
        return res.status(400).json({ message: 'Keywords are required' });
    }

    if (!image) {
        return res.status(400).json({ message: 'Image URL is required' });
    }

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }


    const newBlog = new BlogModel(req.body);
    await newBlog.save();
    return res.status(201).json({ message: "Blog Added Successfully" });
}

export const updateBlogPost = async (req, res) => {
    const { title, description, keywords, image, content } = req.body;
    const { id } = req.params;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    if (!description) {
        return res.status(400).json({ message: 'Description is required' });
    }

    if (!keywords) {
        return res.status(400).json({ message: 'Keywords are required' });
    }

    if (!image) {
        return res.status(400).json({ message: 'Image URL is required' });
    }

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    const newBlog = await BlogModel.updateOne({ _id: id }, { $set: req.body });
    return res.status(200).json({ message: "Blog Update Successfully" });
}

export const getBlogPost = async (req, res) => {
    const { id } = req.params;
    const newBlog = await BlogModel.findOne({ _id: id });
    if (!newBlog) {
        return res.status(404).json({ message: "Blog Post Not Found" });
    }
    return res.status(200).json(newBlog);
}

export const deleteBlogPost = async (req, res) => {
    const { id } = req.params;
    const newBlog = await BlogModel.deleteOne({ _id: id });
    if (!newBlog) {
        return res.status(404).json({ message: "Blog Post Not Found" });
    }
    return res.status(200).json({ message: "Blog Post Delete Successfully" });
}

export const getAllBlogPosts = async (req, res) => {
    const blogs = await BlogModel.find();
    return res.status(200).json(blogs);
}
