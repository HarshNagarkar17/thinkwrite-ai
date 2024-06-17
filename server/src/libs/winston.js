import winston from "winston";

const { combine, timestamp, printf } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({format:"YYYY-MM-DD hh:mm A"}),
    printf(
      (info) =>
        `${info.timestamp} [${info.level.toUpperCase()}] : ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
