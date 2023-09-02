import express from "express";
import winston from "winston";
import mongoose from "mongoose";
import expressWinston from "express-winston";
import router from "./routes";
import logger from "./utils/logger";

const app = express();

mongoose.connect("mongodb://localhost:2717/data").catch(() => {
  logger.error("Could not connect to DB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
    meta: false,
    msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    colorize: true,
  }),
);

app.use("/api", router);

app.listen(1337, () => {
  logger.info(`App is running`);
});
