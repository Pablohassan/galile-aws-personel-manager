const { cloudFront, s3 } = require("../../constants");

module.exports.resource = () => ({
  [cloudFront.originAccessIdentity.webapp.ref]: {
    Type: "AWS::CloudFront::CloudFrontOriginAccessIdentity",
    Properties: {
      CloudFrontOriginAccessIdentityConfig: {
        Comment: ` acess-identity-${s3.bucket.webapp.name}.S3.amazonaws.com `,
      },
    },
  },
});
