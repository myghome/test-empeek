using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace Backend
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {

            HttpConfiguration config = GlobalConfiguration.Configuration;

            config.Formatters.JsonFormatter
                        .SerializerSettings
                        .ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            System.IO.Directory.SetCurrentDirectory(AppDomain.CurrentDomain.RelativeSearchPath);
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
