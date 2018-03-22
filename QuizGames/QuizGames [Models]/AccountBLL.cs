using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuizGames.DAL;

namespace QuizGames.Models
{
    public class AccountBLL
    {
        #region Fields
        #region Variables
        private int _id;
        private string _avatar;
        private string _username;
        private string _email;

        private ProgressionBLL _progress;
        private StatisticsBLL _statistics;

        private AccountDAL _databaseObj;
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
            _databaseObj = new AccountMySQL();
        }
        public AccountBLL(string login)
            : this()
        {
            SetLogin(login);
        }
        #endregion

        #region Methods
        /// <summary>
        /// Logs in using user credentials and returns the session token.
        /// </summary>
        /// <param name="password">The password used to login to the user.</param>
        /// <returns>Returns the session token.</returns>
        public string AuthenticateLogin(string password)
        {
            // Fill in the account reference (email, else username).
            string login = null;
            login = !String.IsNullOrEmpty(_username) ? _username : login;
            login = !String.IsNullOrEmpty(_email) ? _email : login;

            // Log into the user account.
            return _databaseObj.Login(login, password);
        }
        /// <summary>
        /// Logs in using user credentials and returns the session token.
        /// </summary>
        /// <param name="login">The username or email address of the user (replaces the current login details)</param>
        /// <param name="password">The password used to login to the user.</param>
        /// <returns>Returns the session token.</returns>
        public string AuthenticateLogin(string login, string password)
        {
            // Log into the user account.
            SetLogin(login);
            return _databaseObj.Login(login, password);
        }
        /// <summary>
        /// Logs in using user token id.
        /// </summary>
        /// <param name="token">The session's token id.</param>
        /// <returns>Returns the user token id on succession.</returns>
        public string AuthenticateSession(string token)
        {
            // Log into the user account.
            return _databaseObj.Login(token);
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
            // Determine if the login is email or user (email pattern else user) and parse into fields.
            try
            {
                var addr = new System.Net.Mail.MailAddress(login);
                if (addr.Address == login)
                    _email = login;
                else
                    throw new Exception();
            }
            catch
            {
                _username = login;
            }
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
