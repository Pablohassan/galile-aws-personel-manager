const { naming } = require("@galilee/aws-deployer/lib/utils");

const { stage, app } = require("../../../envs");
const { tags: tagsMain } = require("../../main/constants");
const moduleName= 'back'

const { setS3Bucket } = naming(stage, moduleName.toUpperCase(),`${moduleName}-${app}`.toLowerCase());

const constants = {
  tags: [
...tagsMain,
    {Key: 'client:subproject', Value:moduleName},
  ],
  
  s3:{
    bucket:{
      configuration: setS3Bucket('Configuration')
    }
  },
  
};


constants.variables = {};

module.exports = constants;
