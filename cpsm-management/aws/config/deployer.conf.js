const path = require("path");
const { tags } = require("./resource/main/constants");
const { s3 } = require("./resource/module/front/constants",);


const { stage, app, version } = require("./envs");

module.exports = {
  version,
  stackName: `${stage}-stack-${app}`,
  deployStackName: `${stage}-stack-deploy-${app}`,
  deployBucketName: `${stage}-stack-deploy-bucket-${app}`,
  deployTags: tags,
  parameters: [],
  resource: {
    path: "aws/config/resource/main",
  },
  build: {
    path: ".build",
  },
  lambdaExclusion:
    "(/node_modules/(aws-sdk|@common/layer)/|/tests/|/package-lock.json|/buildStaticVariables.js)",
  syncLambdas: [
    {
      input: "aws/lambda",
    },
  ],
  syncBuckets: [
    {
      mode: "sync",
      input: path.join("aws", "config", "resource", "files"),
      bucketPath: "files",
      bucket: s3.bucket.webapp.name,
    },
    {
      mode: "sync",
      input: path.join("web_app", "build"),
      bucket: s3.bucket.webapp.name,
    },

    
    
  ],
};
