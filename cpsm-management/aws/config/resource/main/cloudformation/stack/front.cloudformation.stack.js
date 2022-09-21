// Root
const { cloudformation } = require("../../constants");

// Common

// Aod
const { tags } = require("../../../module/front/constants");

module.exports.nestedStackName = cloudformation.stack.front.name;
module.exports.nestedStackPath = "./aws/config/resource/module/front";
module.exports.resource = ({ templateUrl }) => ({
  [cloudformation.stack.front.ref]: {
    DependsOn: [],
    Type: "AWS::CloudFormation::Stack",
    Properties: {
      TemplateURL: templateUrl,
      Tags: tags,
    },
  },
});
