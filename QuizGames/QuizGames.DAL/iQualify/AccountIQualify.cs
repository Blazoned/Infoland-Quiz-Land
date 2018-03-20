using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace QuizGames.DAL.iQualify
{
    internal class AccountIQualify
    {
        /// <summary>
        /// Retrieves user authentication based on the given credentials.
        /// </summary>
        /// <param name="login">The email or username of the account to login to.</param>
        /// <param name="password">The user pass.</param>
        /// <returns>Returns the token or returns null if not valid.</returns>
        internal dynamic Autherisation(string login, string password)
        {
            // Define the paramater object and fill in the login and password data.
            dynamic parameterObject = new ExpandoObject();

            if (IsValidEmail(login))
                parameterObject.email = login;
            else
                parameterObject.username = login;

            parameterObject.password = password;

            // Send the API request.
            RestClient restClient = new RestClient("authenticate", HttpVerb.POST);
            HttpJsonResponse responseObject = restClient.SendRequest(parameterObject);

            // Return the API response.
            return responseObject.ResponseCode == HttpStatusCode.OK ? responseObject.ResponseBody : null;
        }
        /// <summary>
        /// Retrieves the user's current session based on the token.
        /// </summary>
        /// <param name="token">The user's current token.</param>
        /// <returns>Returns the token or returns null if not valid.</returns>
        internal dynamic Autherisation(string token)
        {
            // Define the paramater object and fill in the token.
            dynamic parameterObject = new ExpandoObject();
            parameterObject.tokenId = token;

            // Send the API request.
            RestClient restClient = new RestClient("authenticate/token", HttpVerb.GET);
            HttpJsonResponse responseObject = restClient.SendRequest(parameterObject);

            // Return the API response.
            return responseObject.ResponseCode == HttpStatusCode.OK ? responseObject.ResponseBody : null;
        }
        /// <summary>
        /// Registers a new user account.
        /// </summary>
        /// <param name="email">The user's email address.</param>
        /// <param name="username">The user's username.</param>
        /// <param name="password">The user's pass.</param>
        /// <param name="firstName">The user's first name.</param>
        /// <param name="lastName">The user's last name.</param>
        /// <returns>Returns true if the registration was succesful.</returns>
        internal dynamic Register(string email, string username, string password, string firstName = null, string lastName = null)
        {
            throw new NotImplementedException();
        }

        private bool IsValidEmail(string input)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(input);
                return addr.Address == input;
            }
            catch
            {
                return false;
            }
        }
    }
}
