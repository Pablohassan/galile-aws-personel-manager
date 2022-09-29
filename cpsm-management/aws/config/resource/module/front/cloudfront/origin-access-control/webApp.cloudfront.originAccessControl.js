
const { cloudFront } = require("../../constants");

module.exports.resource = () => ({
    [cloudFront.originAccessControl.webApp.ref]: {
  Type: "AWS::CloudFront::OriginAccessControl",
  Properties: {
    OriginAccessControlConfig: {
      Description: "Origin Access Control",
      Name: cloudFront.originAccessControl.webApp.name,
      OriginAccessControlOriginType: "s3",
      SigningBehavior: "always",
      SigningProtocol: "sigv4"
    }
    }
    }}
);