const { s3, cloudFront } = require("../../../client_app/constants");
const { fn } = require("@galilee/aws-deployer/lib/utils");

module.exports.resource = () => ({
  [s3.bucketPolicy.clientapp.ref]: {
    Type: "AWS::S3::BucketPolicy",
    Properties: {
      Bucket: fn.ref(s3.bucket.clientapp.ref), // (permet de recuperer le nom  du bucket (policy))
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: ["s3:GetObject"],
            Effect: "Allow",
            Principal: {
              AWS: fn.join(
                "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ",
                fn.ref(cloudFront.originAccessIdentity.clientapp.ref)
              ),
            },
            Resource: fn.arnS3Bucket(s3.bucket.clientapp.name, "/*"),
          },
        ],
      },
    },
  },
});
