import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class VpcStack extends cdk.Stack {
  static DemoVpc: ec2.Vpc;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    VpcStack.DemoVpc = new ec2.Vpc(this, "VPC", {
      cidr: "10.1.0.0/16",
      natGateways: 0,
      maxAzs: 2,
      subnetConfiguration: [
          {
          cidrMask: 24,
          subnetType: ec2.SubnetType.PUBLIC,
          name: "public"
          },
          {
          cidrMask: 24,
          subnetType: ec2.SubnetType.ISOLATED,
          name: "isolated"
          },        
      ]});
  }
}
