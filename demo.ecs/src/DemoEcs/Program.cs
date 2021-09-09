using DemoEcs.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DemoEcs
{
    sealed class Program
    {
        public static void Main(string[] args)
        {
            var services = new ServiceCollection();
            
            new Startup(Configure()).ConfigureServices(services);

            services.BuildServiceProvider().Synth();
        }

        public static IConfiguration Configure()
        {
            return new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .Build();
        }
    }
}
