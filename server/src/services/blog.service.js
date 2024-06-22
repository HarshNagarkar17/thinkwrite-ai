import { config } from "../config/config.js";
import Blogs from "../models/blog.model.js";
import { BadRequest, NotFoundError } from "../utils/errors/index.js";
import axios from "axios";

const blogService = {};

blogService.findBlogbyId = async function (id) {
  return Blogs.findById(id);
};

// blogService.findBlogbyUser = async function (byUser) {
//   return Blogs.find({ byUser });
// };

blogService.getBlogById = async function (id) {
  const blog = await this.findBlogbyId(id);

  if (!blog) throw new NotFoundError("Blog does not exist");
  // if(String(blog.byUser) !== byUser)
  //     throw new BadRequest("Invalid access");

  return blog;
};

blogService.getBlogs = async function () {
  return Blogs.find();
};

blogService.getAllBlogs = async function () {
  const blogs = await this.getBlogs();
  return blogs;
};

blogService.createBlog = async function (title) {
  const blog = await Blogs.create({
    title,
    body: "basic content example for a blog",
  });
  return blog;
};

blogService.fetchBlog = async function (id) {
  if (!id) throw new BadRequest("No id provided");

  const blog = await Blogs.findById(id);

  if (!blog) throw new NotFoundError("no blog found");
  if ("body" in blog && blog.body === undefined) blog.body = null;

  return blog;
};

blogService.generateAiContent = async function (prompt) {
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/openai-community/gpt2",
    { inputs: prompt },
    {
      headers: {
        Authorization: `Bearer ${config.model_api}`,
      },
    }
  );
  const originalTextLength = prompt.length;
  const generatedText = response.data[0].generated_text;
  const answer = generatedText.substring(originalTextLength).trim();
  return answer;
};

blogService.generateAiImage = async function (prompt) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Corcelio/mobius",
    {
      headers: { Authorization: `Bearer ${config.model_api}` },
      method: "POST",
      body: JSON.stringify(prompt),
    }
  );

  const imageBlob = await response.blob();
  const imageBuffer = await imageBlob.arrayBuffer();
  return Buffer.from(imageBuffer);
};

blogService.appendContent = async function (id, content) {
  return Blogs.findByIdAndUpdate(
    id,
    { $set: { body: content } },
    { new: true }
  );
};

export default blogService;
