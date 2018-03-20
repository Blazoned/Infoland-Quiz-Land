using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace QuizGames.DAL.iQualify
{
    internal class RestClient
    {
        /// <summary>
        /// The web address end point that connects to the api.
        /// </summary>
        private string EndPoint { get; set; }
        /// <summary>
        /// The http call method.
        /// </summary>
        private HttpVerb HttpMethod { get; set; }

        public RestClient(string apiPath, HttpVerb httpMethod)
        {
            EndPoint = $"https://quiz.iqualify.nl/api/{apiPath}";
            HttpMethod = httpMethod;
        }

        /// <summary>
        /// Send a request to the iQualify API.
        /// </summary>
        /// <typeparam name="T">The data type of the parameter object.</typeparam>
        /// <param name="apiParameter">The data to serialise into json to send along with the request.</param>
        /// <returns></returns>
        public HttpJsonResponse SendRequest(dynamic apiParameter = null)
        {
            // Initiate api call.
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(EndPoint);
            request.ContentType = "application/json";
            request.Method = HttpMethod.ToString();

            // Add parameter object to the request (in JSON format)
            if (apiParameter != null)
            {
                using (StreamWriter sw = new StreamWriter(request.GetRequestStream()))
                {
                    sw.Write(JsonConvert.SerializeObject(apiParameter));
                    sw.Flush();
                    sw.Close();
                }
            }

            // Retrieve api response.
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            {
                // If the response code is not OK, return an empty response with status code.
                if (response.StatusCode != HttpStatusCode.OK)
                {
                    return new HttpJsonResponse(response.StatusCode);
                }

                // If the response stream is found, return the response data and response code.
                using (Stream responseStream = response.GetResponseStream())
                {
                    if (responseStream != null)
                    {
                        using (StreamReader sr = new StreamReader(responseStream))
                        {
                            return new HttpJsonResponse(response.StatusCode, JsonConvert.DeserializeObject<dynamic>(sr.ReadToEnd()));
                        }
                    }
                }
            }

            // Return an empty response if for an unknown reason no response has been retrieved.
            throw new ApplicationException("An unknown error occured during the API call to iQualify.");
        }
    }
}
