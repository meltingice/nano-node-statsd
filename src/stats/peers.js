import _ from "lodash";

export default async function(client, nano) {
  const peerCount = _.keys((await nano.rpc("peers")).peers).length;
  client.gaugeAndLog("nano.peers.count", peerCount);
}
