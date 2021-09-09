using Amazon.CDK.AWS.EC2;
using DemoEcs;
using DemoEcs.Model;
using DemoEcs.Modules;
using System;
using System.Linq;

namespace aws_deploy.Modules.Networks
{
    internal class VpcModule : IModule
    {
        public static Vpc Vpc { get; set; }

        public VpcModule(VpcOption option, AwsDeployStack stack)
        {
            Vpc = new Vpc(stack, "Vpc", new VpcProps
            {
                Cidr = option.Cidr,
                NatGateways = option.NatNum,
                MaxAzs = option.MaxAzs,
                SubnetConfiguration = option.Subnets.Select(sub => new SubnetConfiguration
                {
                    Name = sub.Name,
                    SubnetType = Enum.Parse<SubnetType>(sub.SubnetType),
                    CidrMask = sub.CidrMask,
                }).ToArray()
            });
        }
    }
}
