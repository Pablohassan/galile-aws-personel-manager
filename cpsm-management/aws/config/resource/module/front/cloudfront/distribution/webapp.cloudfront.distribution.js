const { fn, constants } = require("@galilee/aws-deployer/lib/utils");
const { s3, cloudFront } = require("./../../constants");

const { getCustomDomainName } = require("../../../../../envs");
const { tags } = require("../../../../main/constants");
const s3OriginId = `${s3.bucket.webapp.ref}Origin`; // le nom du bucket S3 ou de la source (custom possible) origin

module.exports.resource = () => ({
  [cloudFront.distribution.webapp.ref]: {
    //Nom de la ressource exporté ici cloudfront distribution

    Type: "AWS::CloudFront::Distribution",
    DependsOn: [
      s3.bucket.webapp.ref,
      cloudFront.originAccessIdentity.webapp.ref,
    ],
    // Le template "AWS::CloudFront::Distribution" est lu à l'envers(dus bas vers le haut),
    // n'est executé qu'a condition que les ressources indiquées dans "DependsOn" soient préalablement crées

    Properties: {
      DistributionConfig: {
        PriceClass: 'PriceClass_100',
        // permet de cree le domain name (obligatoire)
        Comment: `${cloudFront.distribution.webapp.name} `, // le nom de la config
        DefaultCacheBehavior: {
          // la conf du cache cloudfront behavior a configurer obligatoirementy
          FunctionAssociations : [{ 
            EventType: "viewer-request",
            FunctionARN : fn.arnCloudfrontFunction(cloudFront.function.webapp.name)
          }
           ],

          TargetOriginId: s3OriginId, // l'origine de la ressource concerné par le behaviour, plusieurs origines peuvent étres invoques avrec des politiques diferentes
          ViewerProtocolPolicy: "redirect-to-https", // la politique de requette http autorisél, ici " http to https"
          AllowedMethods: ["HEAD", "GET", "OPTIONS"], // les methodes http autorises entre cloudfront et le cache!!
          Compress: true, // on compresse pour un bucket
          CachePolicyId:
            constants.cloudfrontCachePolicy
              .cachingOptimized, // utilisation de le la configuration cache créé par Galilée
          OriginRequestPolicyId: fn.ref(cloudFront.originRequestPolicy.viewerS3.ref)
          
        },
        Enabled: true,
        HttpVersion: 'http2',
        
        Origins: [
          {
            Id: s3OriginId, // l'origine de la ressource
            OriginPath: `/dist`,
            DomainName: fn.regionalDomainName(s3.bucket.webapp.ref),
            S3OriginConfig: {
              OriginAccessIdentity: constants.originAccessIdentify(
                cloudFront.originAccessIdentity.webapp.ref
              ).s3Origin,
            },
          },
        ],
      },
      Tags: tags
    },
  },
});
