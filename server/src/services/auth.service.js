import Users from "../models/user.model.js";
import { BadRequest } from "../utils/errors/index.js";

const authService = {};
authService.createUser = async function (username, password) {
  const userExist = await Users.findOne({ username });

  if (userExist) throw new BadRequest("user alredy exist");
  return Users.create({ username, password });
};

authService.validateUser = async function (username, password) {
  const user = await Users.findOne({ username });
  if (!user) throw new BadRequest("Invalid username");
  if (user.password !== password)
    throw new BadRequest("Invalid password");
  return user;
};

export default authService;
