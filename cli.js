#!/usr/bin/env node
const { Cli } = require("policyer");
const Provider = require(".");

const cli = new Cli(Provider, { description: "Scan todo checks." });

const cliReport = ({ report }) => {
  let formattedReport = { ...report };
  for (const key in formattedReport) {
    if (Object.hasOwnProperty.call(formattedReport, key)) {
      const check = formattedReport[key];
      delete check.stepsResults;
      delete check.inspectedValues;
      check.severity = check.check.severity;
      check.check = check.check.name;
    }
  }
  console.table(formattedReport);
};

cli.run(cliReport);

module.exports = cli;
