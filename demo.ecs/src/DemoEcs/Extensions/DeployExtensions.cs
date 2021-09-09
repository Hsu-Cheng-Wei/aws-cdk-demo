using Amazon.CDK;
using DemoEcs.Model;
using DemoEcs.Modules;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Reflection;

namespace DemoEcs.Extensions
{
    public static class DeployExtensions
    {
        public static void AddConfigures(this IServiceCollection services, IConfiguration cfg)
        {
            VpcOption.Bind(cfg, services);
        }

        public static void AddStack(this IServiceCollection services)
        {
            var app = new App();

            services.AddSingleton(app);

            services.AddSingleton(new AwsDeployStack(app, "AwsDeployStack", new StackProps()));
        }

        public static void AddModules(this IServiceCollection services)
        {
            var moduels = Assembly.GetAssembly(typeof(Program))
                .GetTypes()
                .Where(t => t.IsClass)
                .Where(t => typeof(IModule).IsAssignableFrom(t));

            foreach(var modeule in moduels)
            {
                services.AddSingleton(typeof(IModule), modeule);
            }
        }

        public static void Synth(this IServiceProvider service)
        {
            service.GetServices<IModule>();

            service.GetService<App>()
                .Synth();
        }
    }
}
