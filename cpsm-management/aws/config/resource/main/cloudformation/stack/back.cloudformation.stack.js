// Root
const { cloudformation } = require("../../constants");

// Common


const { tags } = require("../../../module/back/constants");

module.exports.nestedStackName = cloudformation.stack.back.name;
module.exports.nestedStackPath = "./aws/config/resource/module/back";
module.exports.resource = ({ templateUrl }) => ({
  [cloudformation.stack.back.ref]: {
    DependsOn: [],
    Type: "AWS::CloudFormation::Stack",
    Properties: {
      TemplateURL: templateUrl,
      Tags: tags,
    },
  },
});
