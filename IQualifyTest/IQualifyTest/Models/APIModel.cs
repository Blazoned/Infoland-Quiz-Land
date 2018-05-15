using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IQualifyTest.Models
{
    public class APIModel
    {
        public List<EMethods> _methods;
        public string _url;
        public Dictionary<string, string> _headers;
        public List<string> _contentTypes;
        public List<string> _dataTypes;
        public object _data;

        public APIModel()
        {

        }
        public APIModel(string url, List<EMethods> methods, object data = null, Dictionary<string, string> headers = null, List<string> contentTypes = null, List<string> dataTypes = null)
        {
            _methods = methods;
            _url = url;
            _headers = headers;
            _contentTypes = contentTypes;
            _dataTypes = dataTypes;
            _data = data;
        }

        public APIResponseModel SendAPICall()
        {
            return new APIResponseModel(0, "{ Message: \"This request has not been processed.\" }");
        }
    }
}
