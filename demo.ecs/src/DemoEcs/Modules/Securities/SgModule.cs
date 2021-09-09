using Amazon.CDK.AWS.EC2;
using aws_deploy.Modules.Networks;

namespace DemoEcs.Modules
{
    internal class SgModule : IModule
    {
        public static SecurityGroup Sg { get; set; }

        public SgModule(AwsDeployStack stack)
        {
            Sg = new SecurityGroup(stack, "sg-ssh", new SecurityGroupProps
            {
                Vpc = VpcModule.Vpc,
            });

            Sg.AddIngressRule(Peer.AnyIpv4(), Port.Tcp(22));
            Sg.AddIngressRule(Peer.AnyIpv4(), Port.Tcp(80));
        }
    }
}
