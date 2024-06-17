import { AppError } from "../utils/errors/index.js";

export async function errorHandler(err,req,res,next){
    if(err instanceof AppError && err.isOperational){
        return res.status(err.statusCode).json({error:err.message})
    }
    const error = err.message ? err.message : "Internal Server Error";
    res.status(500).json({error})
}