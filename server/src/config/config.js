import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname,"../../",".env");

dotenv.config({path:envPath});

export const config = {
    port: process.env.PORT,
    logger: {
      ENABLE_LOGGIN: process.env.ENABLE_LOGGING,
    },
    jwt: {
      secret: process.env.SECRET,
    },
    mongo:process.env.MONGO_URI,
    model_api:process.env.MODEL_API
}