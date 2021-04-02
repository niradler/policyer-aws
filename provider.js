const AWS = require("aws-sdk");
const { Provider } = require("policyer");

class AWSProvider extends Provider {
  constructor(name = "aws-provider") {
    super(name);
  }

  async collect(configuration) {
    const service = new AWS[configuration.resource]();
    const data = await service[configuration.action](
      configuration.payload
    ).promise();
    return data;
  }

  async evaluate({ configuration, checks }) {
    const data = await this.collect(configuration);
    console.log(data);
    const report = this.evaluateChecks(data, checks);

    return report;
  }
}

module.exports = AWSProvider;
