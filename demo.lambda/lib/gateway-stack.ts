import * as cdk from '@aws-cdk/core';
import * as apigw from "@aws-cdk/aws-apigateway";
import * as acm from "@aws-cdk/aws-certificatemanager";
import { LambdaStack } from './lambda-stack';

export class GatewayStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = LambdaStack.DemoLambda

    const cert = new acm.Certificate(this, "Certificate", {
      domainName: "*.cdk.clarence.tw",
      validation: acm.CertificateValidation.fromDns(),
    });

    new apigw.LambdaRestApi(this, 'Endpoint', {
        handler: lambda,
        domainName:{
          domainName: "api.cdk.clarence.tw",
          certificate: cert
        }
    });
  }
}