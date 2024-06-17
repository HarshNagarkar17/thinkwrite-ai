import { config } from "./config/config.js";
import logger from "./libs/winston.js";
import app from "./server.js";
import http from "http";

const server = http.createServer(app);

const PORT = config.port;

if(!PORT){
    console.error("port is not defined");
    process.exit(1);
}

server.listen(PORT, () => {
    logger.info("server started")
    console.log(`server started on http://localhost:${PORT}`)
})

export default server;
