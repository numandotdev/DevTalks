import express from 'express'; // Import Express
import { uploadBlog, deleteBlogById, editBlogById, getAllBlogs, addBlogLike } from '../controllers/blogController.js';

const blogRouter = express.Router();

// CRUD Operation 
blogRouter.get('/lists', getAllBlogs);
blogRouter.post('/upload', uploadBlog)
blogRouter.put('/edit/:id', editBlogById)
blogRouter.delete('/delete/:id', deleteBlogById)

// Engagements
blogRouter.post('/like/:id', addBlogLike);

export default blogRouter;
