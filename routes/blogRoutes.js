import express from 'express';
import {
    addBlog,
    getAllBlogs,
    updateBlog,
    getSingleBlog,
    deleteBlog,
    getByUserId,
} from '../controllers/blog-controllers.js';

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlog);
blogRouter.patch('/update/:id', updateBlog);
blogRouter.get('/:id', getSingleBlog);
blogRouter.delete('/delete/:id', deleteBlog);
blogRouter.get('/users/:id', getByUserId);
export default blogRouter;
