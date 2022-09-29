const { s3, cloudFront } = require("../../constants");
const { fn, constants } = require("@galilee/aws-deployer/lib/utils");

module.exports.resource = () => ({
  [s3.bucketPolicy.webApp.ref]: {
    Type: "AWS::S3::BucketPolicy",
    Properties: {
      Bucket: fn.ref(s3.bucket.webApp.ref), // (permet de recuperer le nom  du bucket (policy))
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "AllowCloudFrontServicePrincipalReadOnly", //autorise la création d'un politique OAC rataché a la policy du bucket
            Effect: "Allow",
            Principal: {
              Service: "cloudfront.amazonaws.com",
            },
            Action: "s3:GetObject",
            Resource: fn.arnS3Bucket(s3.bucket.webApp.name, "/*"), //le bucket concérné par l OAC
            Condition: {
              StringEquals: {
                "AWS:SourceArn": fn.arnCloudfrontDistribution(
                  fn.ref(cloudFront.distribution.webApp.ref)
                ), //numero de compte AWS + id cloufront methode ,
              },
            },
          },
          
        ],
      },
    },
  },
});
