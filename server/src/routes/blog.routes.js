import express from "express";
import { add, addContent, createAiText, fetch, generateAiImage, getBlog } from "../controller/blog.controller.js";

const blogRouter = express.Router();

blogRouter.get("/fetch/:blogId?", fetch);
blogRouter.post("/add", add);
blogRouter.get("/getBlog/:blogId", getBlog);
blogRouter.post("/aiHelp", createAiText);
blogRouter.post("/aiImage",generateAiImage);
blogRouter.post("/addContent",addContent);

export default blogRouter;
