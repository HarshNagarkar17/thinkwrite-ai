import mongoose, { Schema, Types } from "mongoose";

const userModel = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    blogs: [{ type: Types.ObjectId, ref: "blogs", required: true }],
  },
  {
    timestamps: true,
  }
);


// userModel.pre("save", async function(next){
//   this.password = await bcrypt.hash(this.password,8);
//   next();
// })

userModel.methods.isPasswordMatch = async function(password){
  return bcrypt.compare(password,this.password);
}

const Users = mongoose.model("users", userModel);
export default Users;
