const { naming } = require("@galilee/aws-deployer/lib/utils");

const { stage, app } = require("../../../envs");
const { tags: tagsMain } = require("../../main/constants");
const moduleName = "front";

const { setS3Bucket, setS3BucketPolicy, setOriginAccessIdentity } = naming(
  stage,
  moduleName.toUpperCase(),
  `${moduleName}-${app}`.toLowerCase()
);

const constants = {
  tags: [...tagsMain, { Key: "client:subproject", Value: moduleName }],

  cloudFront: {
    originAccessIdentity: {
      webapp: setOriginAccessIdentity("WebApp"),
      clientapp: setOriginAccessIdentity("ClientApp"),
    },
  },

  s3: {
    bucket: {
      webapp: setS3Bucket("WebApp"),

      clientapp: setS3Bucket("clientapp"),
    },

    bucketPolicy: {
      clientapp: setS3BucketPolicy("ClientApp"),

      webapp: setS3BucketPolicy("WebApp"),
    },
  },
};

constants.variables = {};

module.exports = constants;
