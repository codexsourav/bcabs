import mongoose from "mongoose";

// @ts-check 
const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    keywords: String,
    image: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: "Admin",
    },
});

// Create the model
export const BlogModel = mongoose.model('Blog', blogSchema);