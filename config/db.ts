import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

async function connect() {
  const dbURI = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbURI);
    Logger.info("Connection with database... successful");
  } catch (e) {
    Logger.error("Connection with database... failed " + `Erro: ${e}`);
  }
}

export default connect;
