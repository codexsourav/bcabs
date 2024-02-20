// @ts-check
import express from "express";
import { errorWrapper } from "../../../error/errorWrapper";
import { authorizeAdmin } from "../../../middleware/authorizeAdmin";
import { deleteBlogPost, getAllBlogPosts, getBlogPost, newBlogPost, updateBlogPost } from "../../../controller/admin/blogs/manageBlogsController";

const router = express.Router();

router.post("/api/admin/blog", authorizeAdmin, errorWrapper(newBlogPost));
router.get("/api/admin/blogs", authorizeAdmin, errorWrapper(getAllBlogPosts));
router.get("/api/admin/blog/:id", authorizeAdmin, errorWrapper(getBlogPost));
router.put("/api/admin/blog/:id", authorizeAdmin, errorWrapper(updateBlogPost));
router.delete("/api/admin/blog/:id", authorizeAdmin, errorWrapper(deleteBlogPost));

export default router; 