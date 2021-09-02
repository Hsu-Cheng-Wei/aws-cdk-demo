import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { VpcStack } from './vpc-stack';
import { SgStack } from './sg-stack';
import { S3Stack } from './s3-stack';

export class Ec2Stack extends cdk.Stack {
  static ec2Instance : ec2.Instance;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    Ec2Stack.ec2Instance = this.NewEc2(VpcStack.DemoVpc, SgStack.DemoBaseSg);
  }

  NewEc2(vpc: ec2.Vpc, sg: ec2.SecurityGroup) : ec2.Instance{
    const ec2Instance = new ec2.Instance(this, "Instance",{
      vpc,
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC
      },
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      keyName: "my-key"
    });
  
    ec2Instance.addSecurityGroup(sg);

    const asset = S3Stack.asset;

    const localPath = ec2Instance.userData.addS3DownloadCommand({
      bucket: asset.bucket,
      bucketKey: asset.s3ObjectKey,
    });

    ec2Instance.userData.addExecuteFileCommand({
      filePath: localPath,
      arguments: "--verbose -y",
    });

    asset.grantRead(ec2Instance.role);

    return ec2Instance;
  }
}
