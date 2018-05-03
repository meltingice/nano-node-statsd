# Nano StatsD

A StatsD/Datadog compatible stat collector for [Nano](https://github.com/nanocurrency/raiblocks) nodes. Collects metrics such as peer count, block count, etc.

## Installation

After cloning the repository, run `yarn` to install dependencies. Copy `config.sample.json` to `config.json` and edit the config file to match your setup. All options are present in the sample config file and are set to defaults.

## Running

Simply run `node index.js` to start data collection. It will continue to run until the process is terminated.
