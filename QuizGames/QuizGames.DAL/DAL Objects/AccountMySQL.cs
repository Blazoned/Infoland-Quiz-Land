using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuizGames.DAL.iQualify;

namespace QuizGames.DAL
{
    public class AccountMySQL : AccountDAL
    {
        /// <summary>
        /// Logs into a user account.
        /// </summary>
        /// <param name="login">The email or username of the account to login to.</param>
        /// <param name="password">The user pass.</param>
        /// <returns>Returns the token or returns null if not valid.</returns>
        public override string Login(string login, string password)
        {
            // Make an api call to iQualify to gain autherised access using credentials and return its token if valid.
            return IQualifyAPI.Autherisation(login, password);
        }
        /// <summary>
        /// Logs into a user account's current session.
        /// </summary>
        /// <param name="token">The user's current token.</param>
        /// <returns>Returns the token or returns null if not valid.</returns>
        public override string Login(string token)
        {
            // Make an api call to iQualify to gain autherised access using one's token id and return it again if valid.
            return IQualifyAPI.Autherisation(token);
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
        public override bool Register(string email, string username, string password, string firstName = null, string lastName = null)
        {
            throw new NotImplementedException();
            // TODO: Implement iQualify

            // TODO: Implement Database
        }
    }
}
