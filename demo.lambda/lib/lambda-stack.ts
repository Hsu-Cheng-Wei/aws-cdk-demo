import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda";

export class LambdaStack extends cdk.Stack {
  static DemoLambda: lambda.Function;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    LambdaStack.DemoLambda = new lambda.Function(this, "lambda", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
    });    
  }
}
