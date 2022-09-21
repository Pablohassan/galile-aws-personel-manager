const { s3, tags } = require("../../constants");

module.exports.resource = () => ({
  [s3.bucket.webapp.ref]: {
    Type: "AWS::S3::Bucket",
    Properties: {
      BucketName: s3.bucket.webapp.name,
      AccessControl: "Private",
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },

      WebsiteConfiguration: {
        IndexDocument: "index.html",
        ErrorDocument: "index.html",
      },

      Tags: tags,
      VersioningConfiguration: {
        Status: "Enabled",
      },
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: "AES256",
            },
          },
        ],
      },
    },
  },
});
