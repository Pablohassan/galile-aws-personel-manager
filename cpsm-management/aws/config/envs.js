const {fn} = require('@galilee/aws-deployer/lib/utils');
const {version} = require('../../package.json');

const {APP_DEBUG, APP_STAGE, APP_XRAY_ENABLED, APP_LAMBDA_VPC_DISABLED, AWS_DEFAULT_REGION} = process.env;

const ENV_TEST = 'test';
const ENV_UAT = 'uat';
const ENV_STAGE = 'stage';
const ENV_PROD = 'prod';

const debug = APP_DEBUG === 'true';
const stage = APP_STAGE;
const region = AWS_DEFAULT_REGION;
const isEnvDev = ![ENV_TEST, ENV_UAT, ENV_STAGE, ENV_PROD].includes(APP_STAGE);
const isEnvTest = APP_STAGE === ENV_TEST;
const isEnvUat = APP_STAGE === ENV_UAT;
const isEnvProd = APP_STAGE === ENV_PROD;
const isEnvProdReady = [ENV_STAGE, ENV_PROD].includes(APP_STAGE);
const xrayEnabled = APP_XRAY_ENABLED === 'true';
const isLambdaVpcDisabled = APP_LAMBDA_VPC_DISABLED === 'true';



module.exports = {
  app: 'cm',
  version,
  debug,
  stage,
  region,
  isEnvDev,
  envTest: ENV_TEST,
  isEnvTest,
  isEnvUat,
  isEnvProd,
  isEnvProdReady,
  xrayEnabled,
  isLambdaVpcDisabled
};
