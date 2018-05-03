import fetch from "node-fetch";
import StatsD from "hot-shots";
import { Nano } from "nanode";

import config from "../config.json";
import statCollectors from "./statCollectors";

const client = new StatsD({
  mock: config.testMode,
  globalTags: { tag: "nano" }
});
const nano = new Nano({ url: config.nanoRpc });

client.socket.on("error", function(error) {
  console.error("Error in socket: ", error);
});

async function collectStats() {
  for (let i = 0; i < statCollectors.length; i++) {
    await statCollectors[i](client, nano);
  }

  setTimeout(collectStats, config.statInterval * 1000);
}

collectStats();
