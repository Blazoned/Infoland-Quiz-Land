using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace QuizGames.AspNetCore
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // Initiate a route map template base for MVC
            List<RouteMapBase> routeMapBases = new List<RouteMapBase>
            {
                new RouteMapBase("Default", "{controller=Home}/{action=Index}/{id?}")
            };

            // Display the developer exception page if the deployed environment is of a private developing nature.
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Add developer path to mvc route map
                routeMapBases.Add(
                    new RouteMapBase("Developer", "dev/{controller=Home}/{action=Index}/{id?}")
                );
            }

            // make a call for the MVC service
            app.UseMvc(
                (routeMap) =>
                {
                    foreach (var routeMapBase in routeMapBases) routeMapBase.AddToRouteBuilder(ref routeMap);
                }
            );

            // Run and return response
            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("An error occured. Page not found!");
            });
        }

        #region Container Classes
        #region Route Map Base
        /// <summary>
        /// The route map base will contain the route map and naming of a route.
        /// </summary>
        private class RouteMapBase
        {
            #region Fields
            /// <summary>
            /// The name of the route.
            /// </summary>
            private string _name;
            /// <summary>
            /// The URL pattern of the route.
            /// </summary>
            private string _template;
            #endregion

            #region Properties
            /// <summary>
            /// The name of the route.
            /// </summary>
            public string Name
            {
                get { return _name; }
                set { _name = value; }
            }
            /// <summary>
            /// The URL pattern of the route.
            /// </summary>
            public string Template
            {
                get { return _template; }
                set { _template = value; }
            }
            #endregion

            #region Constructors
            /// <summary>
            /// Create the mapping base for a route.
            /// </summary>
            /// <param name="name">The name of the route.</param>
            /// <param name="template">The URL pattern of the route.</param>
            public RouteMapBase(string name, string template)
            {
                this._name = name;
                this._template = template;
            }
            #endregion

            #region Methods
            public void AddToRouteBuilder(ref IRouteBuilder routeBuilder)
            {
                routeBuilder.MapRoute(this.Name, this.Template);
            }
            #endregion
        }
        #endregion
        #endregion
    }
}
