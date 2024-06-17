import express from "express";
import { add, fetch, getContent } from "../controller/blog.controller.js";

const blogRouter = express.Router();

blogRouter.get("/fetch/:blogId?", fetch);
blogRouter.post("/add", add);
blogRouter.get("/getContent/:blogId", getContent);
export default blogRouter;
