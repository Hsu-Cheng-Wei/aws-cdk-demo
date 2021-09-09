using Amazon.CDK;
using Amazon.CDK.AWS.ECS;
using Amazon.CDK.AWS.ECS.Patterns;
using aws_deploy.Modules.Networks;

namespace DemoEcs.Modules.Instances
{
    internal class EcsModule : IModule
    {
        public EcsModule(AwsDeployStack stack)
        {
            var cluster = new Cluster(stack, "ECSCluster", new ClusterProps
            {
                Vpc = VpcModule.Vpc
            });

            cluster.EnableFargateCapacityProviders();

            var alb = new ApplicationLoadBalancedFargateService(stack, "FargateService",
                new ApplicationLoadBalancedFargateServiceProps
                {
                    Cluster = cluster,          // Required
                    DesiredCount = 1,           // Default is 1
                    TaskDefinition = NewTask(stack),
                    MemoryLimitMiB = 2048,      // Default is 256
                    PublicLoadBalancer = true,
                    SecurityGroups = new []
                    {
                        SgModule.Sg
                    },
                    AssignPublicIp = true,
                }
            );

            new CfnOutput(stack, "LoadBalance Dns", new CfnOutputProps
            {
                Value = alb.LoadBalancer.LoadBalancerDnsName
            });
        }

        private FargateTaskDefinition NewTask(Stack stack)
        {
            var task = new FargateTaskDefinition(stack, "Task", new FargateTaskDefinitionProps
            {
                Cpu = 256,
                MemoryLimitMiB = 512,
            });

            task.AddContainer("simple", new ContainerDefinitionProps
            {
                Image = ContainerImage.FromRegistry("amazon/amazon-ecs-sample"),
                PortMappings = new[]
                {
                    new PortMapping(){ ContainerPort = 80, HostPort = 80, Protocol = Protocol.TCP}
                }
            });

            return task;
        }
    }
}
