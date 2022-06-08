require("dotenv").config();

import express from "express";
import config from "config";
import db from "../config/db";
import router from "./router";
import morganMiddleware from "./middlewares/morganMiddleware";
import Logger from "../config/logger";
const port = config.get<number>("port");

const app = express();

//JSON middleware
app.use(express.json());

app.use(morganMiddleware);

app.use("/api/", router);

//app port

app.listen(port, async () => {
  await db();
  Logger.info(`App is running... in port: ${port}`);
});
