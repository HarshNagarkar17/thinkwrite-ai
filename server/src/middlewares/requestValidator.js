import { validate } from "../utils/validator.js";

export function requestValidator(schemaName) {
  return (
    req,
    res,
    next
  ) => {
    const { data, error } = validate(schemaName, req.body);
    if (error) return res.status(400).json({ errors: error });

    req.body = data;
    next();
  };
}
