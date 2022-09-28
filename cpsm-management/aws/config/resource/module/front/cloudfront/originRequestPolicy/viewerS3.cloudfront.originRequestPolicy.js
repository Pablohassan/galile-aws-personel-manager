const { cloudFront } = require("../../constants");

module.exports.resource = () => ({// export du module cloudfont Origin request policy 
    // ce module permet de configurer la politique  de requetes effectues par cloudfront vers l origine (S3 par exemple)
  [cloudFront.originRequestPolicy.viewerS3.ref]: {
    Type: "AWS::CloudFront::OriginRequestPolicy",
    Properties: {
      OriginRequestPolicyConfig: {
        Name: cloudFront.originRequestPolicy.viewerS3.name,// nomage de la policy interne
        Comment: "Viewer for S3",
        CookiesConfig: {   // authorise de faire des requetes par le viewer vers l origine lies aux cookies(ici non)
          CookieBehavior: "none",
        },
        HeadersConfig: {
          HeaderBehavior: "whitelist",//Liste ce qui peut étre ajouté dans le header
          Headers: [
            "Access-Control-Request-Headers",
            "Access-Control-Request-Method",
            "Origin",
          ],
        },
        QueryStringsConfig: {
          QueryStringBehavior: "none", // renvoi de requetes querystring vers l origine (ici non)
        },
      },
    },
  },
});
