import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { VpcStack } from './vpc-stack';
import { SgStack } from './sg-stack';
import { Guid } from "guid-typescript";

export class Ec2Stack extends cdk.Stack {
  static ec2Instances : ec2.Instance[];
  static ec2InstanceIso : ec2.Instance;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    Ec2Stack.ec2Instances = this.NewEc2(VpcStack.DemoVpc, SgStack.DemoBaseSg, 2);
  }

  NewEc2(vpc: ec2.Vpc, sg: ec2.SecurityGroup, count: number) : ec2.Instance[]{
    const ec2Instances = [] as ec2.Instance[];

    for(var i =0; i< count; i++){
      const name = "Instance" + Guid.create();
      const ec2Instance = new ec2.Instance(this, name,{
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
  
      ec2Instance.addUserData("yum update -y && yum install httpd -y && \
      echo \"Hello `hostname`\" >> /var/www/html/index.html && service httpd start");

      ec2Instances.push(ec2Instance);
    }

    return ec2Instances;
  }
}
