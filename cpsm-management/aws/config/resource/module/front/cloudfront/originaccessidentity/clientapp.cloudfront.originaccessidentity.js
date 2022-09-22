const { cloudFront, s3 } = require("../../constants");

module.exports.resource = () => ({
  [cloudFront.originAccessIdentity.clientapp.ref]: {
    Type: "AWS::CloudFront::CloudFrontOriginAccessIdentity",
    Properties: {
      CloudFrontOriginAccessIdentityConfig: {
        Comment: ` acess-identity-${s3.bucket.clientapp.name}.S3.amazonaws.com `,
      },

     
      

    },
  },
});
