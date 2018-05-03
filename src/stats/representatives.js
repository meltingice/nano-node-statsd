import _ from "lodash";
import config from "../../config.json";

const MAX_SUPPLY = 133248289;

export default async function(client, nano) {
  const reps = (await nano.rpc("representatives")).representatives;
  const repsOnline = (await nano.rpc("representatives_online")).representatives;
  const repsCount = _.keys(repsOnline).length;

  const onlineRepsWithWeight = _.fromPairs(
    _.map(repsOnline, (s, account) => [
      account,
      reps[account] ? nano.convert.fromRaw(reps[account], "mrai") * 10 : 0
    ])
  );

  const onlineWeight = _.sum(
    _.values(onlineRepsWithWeight).map(amt => parseFloat(amt, 10))
  );

  client.gaugeAndLog("nano.representatives.online", repsCount);
  client.gaugeAndLog("nano.representatives.online_weight", onlineWeight);
  client.gaugeAndLog(
    "nano.representatives.official_weight",
    officialRepresentativeWeight(nano, reps)
  );
  client.gaugeAndLog(
    "nano.representatives.official_weight_per",
    officialRepresentativeWeightPercent(nano, reps)
  );
}

function officialRepresentativeWeight(nano, reps) {
  return _.sum(
    config.officialRepresentatives.map(
      account =>
        reps[account]
          ? parseFloat(nano.convert.fromRaw(reps[account], "mrai"), 10)
          : 0
    )
  );
}

function officialRepresentativeWeightPercent(nano, reps) {
  const weight = officialRepresentativeWeight(nano, reps);
  return weight / MAX_SUPPLY * 100;
}
