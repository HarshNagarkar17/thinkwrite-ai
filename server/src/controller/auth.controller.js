import { authService, tokenService } from "../services/index.js";

export const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.validateUser(username, password);
    const tokens = await tokenService.generateTokens(user._id);
    return res.status(200).json({ user, tokens });
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await authService.createUser(username, password);
    const tokens = await tokenService.generateTokens(user._id);
    return res.status(200).json({ user, tokens });
  } catch (error) {
    next(error);
  }
};
