import { schema } from "../schema/index.js";

const fetchSchema = (schemaName) => {
  return schema[schemaName];
};

export const validate = (schemaName, body) => {
  const schema= fetchSchema(schemaName);

  if (!schema) return { data: null, error: "Schema was not found" };

  const { value, error } = schema.validate(body, { abortEarly: true });

  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return { data: null, error: errorDetails };
  }

  return { data: value, error: null };
};
