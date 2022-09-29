const { naming } = require("@galilee/aws-deployer/lib/utils");
const { stage, app } = require("../../../envs");
const { tags: tagsMain } = require("../../main/constants");
const moduleName = "front";

const {
  setCloudFrontFunction,
  setS3Bucket,
  setS3BucketPolicy,
  setOriginAccessControl,
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
      webApp: setCloudFront("WebApp"),
    },
    function: {
      webApp: setCloudFrontFunction("WebApp"),
    },
    originAccessControl: {
      webApp: setOriginAccessControl("WebApp"),
    },
    
    originRequestPolicy: {
      viewerS3: setCloudFrontOriginRequestPolicy("ViewerS3"),
    },
  },

  s3: {
    bucket: {
      webApp: setS3Bucket("WebApp"),
    },

    bucketPolicy: {
      webApp: setS3BucketPolicy("WebApp"),
    },
  },
};

constants.variables = {};
constants.parameters = {};

module.exports = constants;
