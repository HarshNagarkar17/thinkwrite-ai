import { config } from "../config/config.js";
import { BadRequest } from "../utils/errors/index.js";
import jwt from "jsonwebtoken";

export async function auth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header) throw new BadRequest("token not provided");

    const token = header.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Token missing from Authorization header" });

    const decoded = jwt.verify(token, config.jwt.secret);

    req.user = decoded.sub;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
