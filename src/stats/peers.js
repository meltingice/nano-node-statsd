import _ from "lodash";

export default async function(client, nano) {
  const peerCount = _.keys((await nano.rpc("peers")).peers).length;
  console.log("nano.peers.count", peerCount);
  client.gauge("nano.peers.count", peerCount);
}
