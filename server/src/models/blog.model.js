import mongoose, { Schema } from "mongoose";

const blogModel = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model("blogs", blogModel);
export default Blogs;
