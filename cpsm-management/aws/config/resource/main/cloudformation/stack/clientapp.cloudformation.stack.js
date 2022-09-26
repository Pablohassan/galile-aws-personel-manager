const { cloudformation } = require("../../constants");
const { tags } = require("../../../module/client_app/constants");

module.exports.nestedStackName = cloudformation.stack.clientapp.name;
module.exports.nestedStackPath = "./aws/config/resource/module/client_app";
module.exports.resource = ({ templateUrl }) => ({
  [cloudformation.stack.clientapp.ref]: {
    DependsOn: [],
    Type: "AWS::CloudFormation::Stack",
    Properties: {
      TemplateURL: templateUrl,
      Tags: tags,
    },
  },
});
