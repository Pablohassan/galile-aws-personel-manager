const { fn, constants } = require("@galilee/aws-deployer/lib/utils");
const { s3, cloudFront } = require("../../constants");
const { tags } = require("../../../../main/constants");
const s3OriginId = `${s3.bucket.webApp.ref}Origin`; // le nom du bucket S3 ou de la source (custom possible) origin

module.exports.resource = () => ({
  [cloudFront.distribution.webApp.ref]: {
    //Nom de la ressource exporté ici cloudfront distribution
    Type: "AWS::CloudFront::Distribution", // le type est obligatoire dans une template cloufromation

    DependsOn: [
      // n'est executé qu'a condition que les ressources indiquées dans "DependsOn" soient préalablement crées
      s3.bucket.webApp.ref,

       // penser a rajouter
    ],
    // y penser, le template "AWS::CloudFront::Distribution" est lu à l'envers(du bas vers le haut),

    Properties: {
      DistributionConfig: {
        PriceClass: "PriceClass_100", //  permet de selectioner les regions a déployer, ici "Amerique du nord et Europe"
        // permet de cree le domain name (obligatoire)
        Comment: `${cloudFront.distribution.webApp.name} `, // le nom ou commentaire  de la config pas de la ressource!!
        DefaultCacheBehavior: {
          // la conf du cache cloudfront behavior a configurer obligatoirement
          FunctionAssociations: [
            // on peut associer une function simple a cloudfront de maniere gratuite. ?
            {
              EventType: "viewer-request", // indique le declancheur de la function
              FunctionARN: fn.arnCloudfrontFunction(
                // fais appel a la function de nomage créé par galilé pour cloudfrontFunction
                cloudFront.function.webApp.name // indiquer ici la structure du nom a recuperer par la function
              ),
            },
          ],
          TargetOriginId: s3OriginId, // l'origine de la ressource concerné par le behaviour, plusieurs origines peuvent étres invoques avrec des politiques diferentes
          ViewerProtocolPolicy: "redirect-to-https", // la politique de requette http autorisé, ici " http to https"
          AllowedMethods: ["HEAD", "GET", "OPTIONS"], // les methodes http autorises entre cloudfront et le cache! ( H G O , par default)
          Compress: true, // on compresse lordque on est sur un bucket S3
          CachePolicyId: constants.cloudfrontCachePolicy.cachingOptimized, // utilisation de le la configuration cache créé par Galilée
          OriginRequestPolicyId: fn.ref(
            // champs obligatoire indique l'origineRequestPolicy, cad la politique de "requetage" du bucket crée au préalable cloudfront
            cloudFront.originRequestPolicy.viewerS3.ref
          ),
        },
        Enabled: true, // ne pas oublier d'activer la distribution config
        HttpVersion: "http2",
        Origins: [
          {
            Id: s3OriginId, // l'origine de la ressource voir plus haut
            OriginPath: `/dist`, // le chemin cible de l'origine pour cloudfront
            DomainName: fn.regionalDomainName(s3.bucket.webApp.ref), //le nom dre domine est créée via cette function, toujours choisir regional domaine name
            OriginAccessControlId: fn.attr(cloudFront.originAccessControl.webApp.ref, "Id"), // recuperer l'id de l'OAC,

            S3OriginConfig: {
              //configuration de l'origine, ici S3, pour la partie OAI
              OriginAccessIdentity: ""
            },
          },
        ],
      },

      Tags: tags,
    },
  },
});
