using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IQualifyTest
{
    [Controller]
    public abstract class APIController
    {
        [ActionContext]
        public ActionContext ActionContext { get; set; }

        public HttpContext HttpContext => ActionContext?.HttpContext;

        public HttpRequest Request => ActionContext?.HttpContext?.Request;

        public HttpResponse Response => ActionContext?.HttpContext?.Response;

        public IServiceProvider Resolver => ActionContext?.HttpContext?.RequestServices;
    }
}
