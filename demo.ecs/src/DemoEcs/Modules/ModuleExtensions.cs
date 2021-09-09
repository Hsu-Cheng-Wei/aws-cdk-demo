using aws_deploy.Modules.Networks;
using Microsoft.Extensions.DependencyInjection;

namespace aws_deploy.Modules
{
    public static class ModuleExtensions
    {
        public static IServiceCollection AddModules(this IServiceCollection services)
        {
            services.AddScoped<VpcModule>();

            return services;
        }
    }
}
