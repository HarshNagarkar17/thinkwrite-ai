import { isValidObjectId } from "mongoose";
import { blogService } from "../services/index.js";
import { BadRequest } from "../utils/errors/index.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { __dirname } from "../utils/helpers.js";

const imageDir = path.join(__dirname, "../../images");

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

export const getBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    if (!isValidObjectId(blogId)) throw new BadRequest("Invalid Id");

    const blog = await blogService.fetchBlog(blogId);
    return res.status(200).json({ blog });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

export const createAiText = async (req, res, next) => {
  try {
    const text = await blogService.generateAiContent(req.body.prompt);
    return res.status(200).json({ text });
  } catch (error) {
    next(error);
  }
};

export const generateAiImage = async (req, res, next) => {
  try {
    const imageBuffer = await blogService.generateAiImage(req.body.prompt);
    const imagName = `${uuidv4()}.jpeg`;
    const imgPath = path.join(imageDir, imagName);
    fs.writeFileSync(imgPath, imageBuffer);
    const imageUrl = `http://localhost:3000/images/${imagName}`;
    return res.status(200).json({ image: imageUrl });
  } catch (error) {
    next(error);
  }
};

export const addContent = async (req, res, next) => {
  try {
    const { id, content } = req.body;
    const blog = await blogService.appendContent(id, content);
    return res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};
