using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IQualifyTest.Models
{
    public class APIResponseModel
    {
        public short _responseCode;
        public object _data;

        public APIResponseModel(short responseCode, object data)
        {
            _responseCode = responseCode;
            _data = data;
        }
    }
}
