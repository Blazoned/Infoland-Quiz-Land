using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace QuizGames.DAL.iQualify
{
    internal class HttpJsonResponse
    {
        public HttpStatusCode ResponseCode { get; }
        public dynamic ResponseBody { get; }

        public HttpJsonResponse(HttpStatusCode responseCode, dynamic responseBody = null)
        {
            ResponseCode = responseCode;
            ResponseBody = responseBody;
        }
    }
}
