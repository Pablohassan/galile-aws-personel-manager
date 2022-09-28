const { naming } = require("@galilee/aws-deployer/lib/utils");
const { stage, app } = require("../../../envs");
const { tags: tagsMain } = require("../../main/constants");
const moduleName = "front";

const {
  setCloudFrontFunction,
  setS3Bucket,
  setS3BucketPolicy,
  setOriginAccessIdentity,
  setCloudFrontOriginRequestPolicy,
  setCloudFront,
} = naming(
  stage,
  moduleName.toUpperCase(),
  `${moduleName}-${app}`.toLowerCase()
);

const constants = {
  tags: [...tagsMain, { Key: "client:subproject", Value: moduleName }],

  cloudFront: {
    distribution: {
      webapp: setCloudFront("WebApp"),
    },
    function: {
      webapp: setCloudFrontFunction("WebApp"),
    },
    originAccessIdentity: {
      webapp: setOriginAccessIdentity("WebApp"),
    },
    originRequestPolicy: {
      viewerS3: setCloudFrontOriginRequestPolicy("ViewerS3"),
    },
  },

  s3: {
    bucket: {
      webapp: setS3Bucket("WebApp"),
    },

    bucketPolicy: {
      webapp: setS3BucketPolicy("WebApp"),
    },
  },
};

constants.variables = {};
constants.parameters = {
};


module.exports = constants;
