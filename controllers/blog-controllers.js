import mongoose, { mongo } from 'mongoose';
import Blog from '../models/Blog.js';
import User from '../models/User.js';

export const getAllBlogs = async (req, res) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ msg: 'no blog found' });
    }
    return res.status(200).json({ blogs });
};
export const addBlog = async (req, res) => {
    const { title, desc, image, user } = req.body;
    let existingUser;
    console.log(`--------- user id -- ${user}`);
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) return res.status(400).json({ msg: 'user not exist' });
    const blog = new Blog({
        title,
        desc,
        image,
        user: user,
    });
    try {
        await blog.save();
        existingUser.blogs.push(blog);
        await existingUser.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(200).json({ blog });
};
export const updateBlog = async (req, res) => {
    const blogId = req.params.id;
    const { title, desc, image } = req.body;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            desc,
            image,
        });
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ msg: "blog doesn't exist" });
    }
    return res.status(200).json({ blog });
};

export const getSingleBlog = async (req, res) => {
    let blog;
    const blogId = req.params.id;
    try {
        blog = await Blog.findById(blogId);
    } catch (err) {
        return console.log(err);
    }
    if (!blog) return res.status(404).json({ msg: 'blog not found' });
    return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        return console.log(err);
    }
    if (!blog) return res.status(500).json({ msg: 'Unable to Delete' });
    return res.status(404).json({ msg: 'deleted successfully' });
};

export const getByUserId = async (req, res) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate('blogs');
        console.log(userBlogs);
    } catch (Err) {
        return console.log(Err);
    }
    if (!userBlogs) return res.status(404).json({ msg: 'No Blog Found' });
    return res.status(200).json({ blogs: userBlogs.blogs });
};
