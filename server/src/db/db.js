import mongoose from "mongoose";
import { shutDown } from "../utils/serverutils/shutDown.js";
import { config } from "../config/config.js";

mongoose.connect(config.mongo);

const db = mongoose.connection;

db.on("connecting", () => {
  console.info({ message: "MongoDB Connecting" });
});

db.once("open", async () => {
  console.log("MONGO-DB DATABASE CONNECTED");
});

db.on("disconnecting", () => {
  console.warn({ message: "MongoDB Disconnecting" });
});

db.on("disconnected", () => {
  console.warn({ message: "MongoDB Disconnected" });
});

db.on("close", () => {
  console.warn({ message: "MongoDB Connection Closed Successfully!" });
});

db.on("reconnected", () => {
  console.warn({ message: "MongoDB Reconnected" });
});

db.on("reconnectFailed", () => {
  console.warn({ message: "MongoDB Reconnect Failed" });
});

db.on("error", (err) => {
  console.error({ message: `MongoDB connection error - ${err.toString()}` });
  shutDown(true);
});

export default db;
