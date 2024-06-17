import { isValidObjectId } from "mongoose";
import { blogService } from "../services/index.js";
import { BadRequest } from "../utils/errors/index.js";

export const fetch = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    // const id = req.user;
    if (blogId) {
      const blog = await blogService.getBlogById(blogId);
      return res.status(200).json({ blog });
    }
    const blogs = await blogService.getAllBlogs();
    return res.status(200).json({ blogs });
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  try {
    const { title } = req.body;
    const blog = await blogService.createBlog(title);
    return res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};

export const getContent = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    if (!isValidObjectId(blogId)) throw new BadRequest("Invalid Id");

    const content = await blogService.getContent(blogId);
    return res.status(200).json({ content });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};
