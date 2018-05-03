import _ from "lodash";

export default async function(client, nano) {
  await blockCount(client, nano);
  await blockCountByType(client, nano);
}

async function blockCount(client, nano) {
  const blockCount = await nano.blocks.count();
  client.gaugeAndLog("nano.blocks.unchecked", blockCount.unchecked);
  client.gaugeAndLog("nano.blocks.count", blockCount.count);
}

async function blockCountByType(client, nano) {
  const blockCounts = await nano.blocks.count(true);
  _.forEach(blockCounts, (count, type) => {
    client.gaugeAndLog(`nano.blocks.${type}.count`, count);
  });
}
