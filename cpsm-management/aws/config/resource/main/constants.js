const { naming } = require("@galilee/aws-deployer/lib/utils");

const { stage, app } = require("../../envs");

const { setNestedStack } = naming(stage, app.toUpperCase(), app.toLowerCase());

const constants = {
  tags: [
    { Key: "client:name", Value: "galilee" },
    { Key: "client:project", Value: "weshare" },
    { Key: "client:subproject", Value: "cpsm-management" },
    { Key: "client:env", Value: stage },
  ],
  cloudformation: {
    stack: {
      front: setNestedStack("Front"), //(nestedStack pour les nomage des versions)
      back: setNestedStack("Back"),
      clientapp: setNestedStack("ClientApp")
    },
  },
};

constants.variables = {};

module.exports = constants;
