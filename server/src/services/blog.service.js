import Blogs from "../models/blog.model.js";
import { BadRequest, NotFoundError } from "../utils/errors/index.js";

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
  const blog = await Blogs.create({ title, body: "example content" });
  return blog;
};

blogService.getContent = async function (id) {
  if (!id) throw new BadRequest("No id provided");

  const blog = await Blogs.findById(id).select("body -_id");

  if (!blog) throw new NotFoundError("no blog found");
  if ("body" in blog && blog.body === undefined) blog.body = null;

  return blog;
};
export default blogService;
