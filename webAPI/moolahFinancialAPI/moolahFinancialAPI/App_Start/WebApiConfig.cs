using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace moolahFinancialAPI
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Web API configuration and services

      // Web API routes
      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
          name: "MoolahFinancialApi",
          routeTemplate: "MoolahFinancialApi/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
      );
    }
  }
}
