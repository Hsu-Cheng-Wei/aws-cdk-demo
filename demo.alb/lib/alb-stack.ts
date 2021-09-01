import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as targets from '@aws-cdk/aws-elasticloadbalancingv2-targets';
import { VpcStack } from './vpc-stack';
import { SgStack } from './sg-stack';
import { Ec2Stack } from './ec2-stack';

export class AlbStack extends cdk.Stack {
  static DemoAlb: elbv2.ApplicationLoadBalancer;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const instanceIds = [] as string[];

    Ec2Stack.ec2Instances.forEach(i => {
      instanceIds.push(i.instanceId);
    });

    AlbStack.DemoAlb = this.NewAlb(instanceIds, VpcStack.DemoVpc);
  }

  NewAlb(targetIds: string[], vpc: ec2.Vpc): elbv2.ApplicationLoadBalancer {
    const lb = new elbv2.ApplicationLoadBalancer(this, "ALB", {
        loadBalancerName: "demo-lb",
        vpc,
        internetFacing: true
    });

    lb.addSecurityGroup(SgStack.DemoHttpSg);

    const listener = lb.addListener("listener", {
        protocol: elbv2.ApplicationProtocol.HTTP,
        port: 80,
        open: true,
    });

    var ts = [] as elbv2.IApplicationLoadBalancerTarget[];
    
    targetIds.forEach(id => {
      ts.push(new targets.InstanceIdTarget(id, 80));
    });

    listener.addTargets("Targets", {
        healthCheck:{
            enabled: true,
            path: "/"
        },
        port:80,
        targets: ts
    });

    new cdk.CfnOutput(this, "LoadBalanceDNS", {
        value: lb.loadBalancerDnsName
    });    

    return lb;
  }
}
