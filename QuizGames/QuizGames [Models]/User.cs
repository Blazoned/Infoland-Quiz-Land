using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuizGames.Models
{
    public class User
    {
        //fields
        private int id;
        private string tokenId;
        private string email;
        private string username;
        private string firstName;
        private string surName;

        public int Id
        {
            get { return id; }
            set { id = value; }
        }
        public string TokenId
        {
            get { return tokenId; }
            set { tokenId = value; }
        }
        public string Email
        {
            get { return email; }
            set { email = value; }
        }
        public string Username
        {
            get { return username; }
            set { username = value; }
        }
        public string FirstName
        {
            get { return firstName; }
            set { firstName = value; }
        }
        public string SurName
        {
            get { return surName; }
            set { surName = value; }
        }

        //methods
        public string AuthenticateLogin(string login, string password)
        {
            return null;
        }

        public string AuthenticateSession(string token)
        {
            return null;
        }

        public Boolean EditSettings()
        {
            return true;
        }

       public string Hostname(EGamemode gamemode)
       {
            return null;
       }

        public string JoinGame(string sessionid)
        {
            return null;
        }

        
        public string JoinGame(EGamemode gamemode)
        {
            return null;
        }
    }
}