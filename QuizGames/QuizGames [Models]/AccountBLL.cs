using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizGames.Models
{
    public class AccountBLL
    {
        #region Fields
        #region Variables
        private string _avatar;
        private string _username;
        private string _email;

        private ProgressionBLL _progress;
        private StatisticsBLL _statistics;
        #endregion

        #region Properties
        public ProgressionBLL Progression
        {
            get
            {
                throw new NotImplementedException();

                /// TODO: If the progress is null, make an api data retrieval call (or database call for the sandbox application) else return the current data
                if (_progress == null)
                {
                    _progress = null;
                }

                return _progress;
            }
        }
        public StatisticsBLL Statistics
        {
            get
            {
                throw new NotImplementedException();

                /// TODO: If the statistics are null, make an api data retrieval call (or database call for the sandbox application) else return the current data
                if (_statistics == null)
                {
                    _progress = null;
                }

                return _statistics;
            }
        }
        #endregion
        #endregion

        #region Constructor
        public AccountBLL()
        {

        }
        public AccountBLL(string login)
        {
            SetLogin(login);
        }
        #endregion

        #region
        /// <summary>
        /// Logs in using user credentials and returns the session token.
        /// </summary>
        /// <param name="password">The password used to login to the user.</param>
        /// <param name="login">The username or email address of the user (replaces the current login details)</param>
        /// <returns>Returns the session token.</returns>
        public string AuthenticateLogin(string password, string login)
        {
            SetLogin(login);
            return AuthenticateLogin(password);
        }
        /// <summary>
        /// Logs in using user credentials and returns the session token.
        /// </summary>
        /// <param name="password">The password used to login to the user.</param>
        /// <returns>Returns the session token.</returns>
        public string AuthenticateLogin(string password)
        {
            string key = AuthenticateLogin(password);
            /// TODO: Login & Load Account
            throw new NotImplementedException();

            return key;
        }
        /// <summary>
        /// Logs in using user
        /// </summary>
        /// <param name="token"></param>
        public void AuthenticateSession(string token)
        {
            /// TODO: Login & Load Account
            throw new NotImplementedException();
        }

        public bool UpdatePassword()
        {
            /// TODO: Update user password (USE CREDENTIALS AND TOKEN)
            throw new NotImplementedException();
        }
        public bool ResetPassword()
        {
            /// TODO: Change password (USE CREDENTIALS)
            throw new NotImplementedException();
        }
        public bool RequestPassword()
        {
            /// TODO: Sent mail to user after reset password (USE CREDENTIALS)
            throw new NotImplementedException();
        }


        public void Register()
        {
            /// TODO: Register Account
            throw new NotImplementedException();
        }
        public bool RemoveAccount()
        {
            /// TODO: Delete user (USE CREDENTIALS & TOKEN)
            throw new NotImplementedException();
        }
        public bool ActivateAccount()
        {
            /// TODO: Activate account (USE CREDENTIALS & TOKEN)
            throw new NotImplementedException();
        }


        public bool EditSettings()
        {
            /// TODO: Decide parameters and how to edit settings (USE CREDENTIALS & TOKEN)
            throw new NotImplementedException();
        }

        private void SetLogin(string login)
        {
            /// TODO: Determine if login is email or user (email pattern else user) and parse into fields
            throw new NotImplementedException();
        }
        /// <summary>
        /// Releases the data containted within the Progress and Statistics properties.
        /// </summary>
        public void FlushAnalytics()
        {
            _progress = null;
            _statistics = null;
        }
        #endregion
    }
}
