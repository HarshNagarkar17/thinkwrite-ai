import express from "express";
import "./db/db.js";
import corsMiddleware from "./middlewares/cors.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authRouter, blogRouter, userRouter } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(corsMiddleware);

app.use("/auth", authRouter);
app.use("/l", blogRouter);
app.use("/", userRouter);

app.use(errorHandler);
export default app;
