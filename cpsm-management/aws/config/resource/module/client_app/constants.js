const { naming } = require("@galilee/aws-deployer/lib/utils");
const { stage, app } = require("../../../envs");
const { tags: tagsMain } = require("../../main/constants");
const moduleName = "ClientApp";

const { setS3Bucket, setS3BucketPolicy, setOriginAccessIdentity } = naming(
  stage,
  moduleName.toUpperCase(),
  `${moduleName}-${app}`.toLowerCase()
);

const constants = {
  tags: [...tagsMain, { Key: "client:subproject", Value: moduleName }],

  cloudFront: {
    originAccessIdentity: {
      clientapp: setOriginAccessIdentity("ClientApp"),
    },
  },
  s3: {
    bucket: {
      clientapp: setS3Bucket("ClientApp"),
    },
    bucketPolicy: {
      clientapp: setS3BucketPolicy("ClientApp"),
    },
  },
};
constants.variables = {};

module.exports = constants;
