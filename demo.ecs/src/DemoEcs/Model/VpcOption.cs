using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DemoEcs.Model
{
    internal class VpcSubnet
    {
        public string Name { get; set; }

        public double? CidrMask { get; set; }

        public string SubnetType { get; set; }
    }

    internal class VpcOption
    {
        public string Cidr { get; set; }

        public double? NatNum { get; set; }

        public double? MaxAzs { get; set; }

        public VpcSubnet[] Subnets { get; set; }

        public static void Bind(IConfiguration cfg, IServiceCollection services)
        {
            var option = new VpcOption();

            cfg.GetSection("VpcConfig").Bind(option);

            services.AddSingleton(option);
        }
    }
}
