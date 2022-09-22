const { s3, cloudFront } = require("./../../constants");
const { fn } = require("@galilee/aws-deployer/lib/utils");

module.exports.resource = () => ({
  [s3.bucketPolicy.webapp.ref]: {
    Type: "AWS::S3::BucketPolicy",
    Properties: {
      Bucket: fn.ref(s3.bucket.webapp.ref), // (permet de recuperer le nom  du bucket (policy))
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: ["s3:GetObject"],
            Effect: "Allow",
            Principal: {
              AWS: fn.join(
                "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ",
                fn.ref(cloudFront.originAccessIdentity.webapp.ref)
              ),
            },
            Resource: fn.arnS3Bucket(s3.bucket.webapp.name, "/*"),
          },
        ],
      },
    },
  },
});
