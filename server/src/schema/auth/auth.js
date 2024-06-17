import Joi from "joi";

export const authSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username should be type text",
    "string.empty": "Username can not be empty",
    "string.min": "Username is too short.",
    "string.max": "Username is too big",
    "any.required": "Username is required",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-30 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have a minimum length of 8",
      "string.max": "Password should have a maximum length of 30",
      "any.required": "Password is a required field",
    }),
});
