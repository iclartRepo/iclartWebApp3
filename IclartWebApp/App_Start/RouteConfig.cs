﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace IclartWebApp
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                 "Home",
                 "home",
                 new {controller = "Home", action = "Index"}
           );

            /* Account Management */
            routes.MapRoute(
                "ChangePassword",
                "changepassword",
                new { controller = "Manage", action = "ChangePassword" }
            );

            routes.MapRoute(
              "ForgotPassword",
              "forgotpassword",
              new { controller = "Account", action = "ForgotPassword" }
              );

            routes.MapRoute(
            "ManageAccount",
            "accounts",
            new { controller = "Account", action = "ManageAccount" }
             );

            /* Client Management */

            routes.MapRoute(
           "ManageClient",
           "clients",
           new { controller = "Client", action = "Index" }
            );

            routes.MapRoute(
         "AddClient",
         "addclient",
         new { controller = "Client", action = "AddClient" }
          );

            /* Competitor Management */

            routes.MapRoute(
                 "ManageCompetitors",
                 "competitors",
                 new { controller = "Competitor", action = "Index" }
                  );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Account", action = "Login", id = UrlParameter.Optional }
            );
        } 
    }
}
