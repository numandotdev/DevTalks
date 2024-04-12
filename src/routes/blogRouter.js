import express from 'express'; // Import Express
import { addBlog, deleteBlogById, editBlogById, getAllBlogs } from '../controllers/blogController.js';

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlog)
blogRouter.delete('/delete/:id', deleteBlogById)
blogRouter.put('/edit/:id', editBlogById)

export default blogRouter;
