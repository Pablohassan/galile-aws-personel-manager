const { naming } = require("@galilee/aws-deployer/lib/utils");

const { stage, app } = require("../../../envs");
const { tags: tagsMain } = require("../../main/constants");
const moduleName= 'front'

const { setS3Bucket } = naming(stage, moduleName.toUpperCase(),`${moduleName}-${app}`.toLowerCase());

const constants = {
  tags: [
...tagsMain,
    {Key: 'client:subproject', Value:moduleName},
  ],
  
  s3:{
    bucket:{
      webapp: setS3Bucket('WebApp'),
     
    }
  }
 ,
  
};

constants.variables = {};

module.exports = constants;
