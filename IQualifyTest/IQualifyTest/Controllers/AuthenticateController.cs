using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IQualifyTest.Controllers
{
    [Produces("application/json")]
    [Route("api/authenticate")]
    public class AuthenticateController : APIController
    {
        public IActionResult Index()
        {
            return new OkObjectResult("{ \"Message\": \"A random message\" }");
        }
    }
}