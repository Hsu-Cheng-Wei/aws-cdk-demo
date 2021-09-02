import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { VpcStack } from './vpc-stack';
import { AlbStack } from './alb-stack';

export class SgStack extends cdk.Stack {

    static DemoBaseSg: ec2.SecurityGroup;
    
    static DemoHttpSg: ec2.SecurityGroup;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const vpc = VpcStack.DemoVpc;

        SgStack.DemoBaseSg = this.NewSSHSg(vpc);

        SgStack.DemoHttpSg = this.NewHttpSg(vpc);
    }

    NewSSHSg(vpc: ec2.Vpc) : ec2.SecurityGroup{
        const sg = new ec2.SecurityGroup(this, "my-ssh-http-sg", {
            vpc,
            description: "Allow ssh access to ec2 instances from anywhere.",
            allowAllOutbound: true
        });

        //ssh
        sg.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(22),
            "allow public ssh access."
        );

        //http
        sg.addIngressRule(
            ec2.Peer.ipv4(VpcStack.DemoVpc.vpcCidrBlock),
            ec2.Port.tcp(80),
            "allow public http."
        );

        return sg;
    }
    
    NewHttpSg(vpc: ec2.Vpc) : ec2.SecurityGroup{
        const sg = new ec2.SecurityGroup(this, "onlyHttpSg", {
            vpc,
            description: "Only 80 port",
            allowAllOutbound: true
        });

        //http
        sg.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(80),
            "allow public http."
        );

        return sg;
    }    
}
