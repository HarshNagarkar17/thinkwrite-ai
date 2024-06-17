import express from "express";
import { requestValidator } from "../middlewares/requestValidator.js";
import { signIn, signUp } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signUp",requestValidator("auth"),signUp);
authRouter.post("/signIn", requestValidator("auth"),signIn)

export default authRouter;