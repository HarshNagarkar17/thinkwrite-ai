import express from "express";
import { auth } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/", auth,async(req,res) => {
    return res.json({message:"got it"})
})

export default userRouter;