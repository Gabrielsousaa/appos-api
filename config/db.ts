import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

async function connect() {
  const dbURI = config.get<string>("dbUriCluster");
  const dbLocal = config.get<string>("dbLocalCluster");

  try {
    await mongoose.connect(dbLocal);
    Logger.info("Connection with database... successful");
  } catch (e) {
    Logger.error("Connection with database... failed " + `Erro: ${e}`);
  }
}

export default connect;
