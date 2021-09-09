using Amazon.CDK;

namespace DemoEcs
{
    internal class AwsDeployStack : Stack
    {
        public AwsDeployStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
        }
    }
}
