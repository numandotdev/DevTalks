import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

// @route   GET api/blogs/
export const getAllBlogs = async (req, res) => {
  let blogsList;
  try {
    blogsList = await Blog.find({});
    // if (!!blogsList) return res.status(404).json({ message: "No blogs found" });

    res.status(201).json({
      message: "Blogs fetched successfully",
      data: blogsList,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   POST api/blogs/add
export const addBlog = async (req, res) => {
  const { title, content, author, imageUrl } = req.body;
  if (!title || !content || !author)
    return res.status(400).json({ msg: "Missing fields" });
  // Check for existing blog with the same title
  const isBlogAvailable = await Blog.findOne({ title: title });

  if (isBlogAvailable)
    return res.status(400).json({ msg: "Blog already exists" });
  let existingUser;
  try {
    existingUser = await User.findById(author);
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    return res.status(404).json({ msg: "Author not found!" });
  }
  const newBlog = new Blog({
    title,
    content,
    author,
    imageUrl: imageUrl || "",
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const savedBlog = await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      message: "Blog added successfully!",
      data: savedBlog,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/blogs/delete/:id
export const deleteBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog)
      return res.status(404).json({ msg: "No blog found with that ID." });

    const existingUser = await User.findById(blog.author);

    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.blogs.pop(blog._id);
    await existingUser.save({ session });
    await Blog.deleteOne({ _id: id }, { session });
    await session.commitTransaction();

    return res.status(200).json({ message: "Blog has been removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to delete the blog" });
  }
};

// @route   PUT /api/blogs/edit/:id
export const editBlogById = async (req, res) => {
  const { id } = req.params;
  const { title, content, imageUrl } = req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) res.status(404).json({ msg: "No blog found with that ID." });

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, imageUrl },
      { new: true }
    );
    res.status(200).json({
      message: "Blog has been updated.",
      data: updatedBlog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update blog post" });
  }
};
