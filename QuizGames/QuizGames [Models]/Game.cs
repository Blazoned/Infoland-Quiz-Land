using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuizGames.Models
{
    public class Game
    {
        //fields
        private string sessionId;
        private EGamemode gamemode;
        private EGameStatus gameStatus;
        private EGameSessionStatus sessionStatus;

        public string SessionId
        {
            get { return sessionId; }
            set { sessionId = value; }
        }

        public EGamemode Gamemode
        {
            get { return gamemode; }
            set { gamemode = value; }
        }

        public EGameStatus GameStatus
        {
            get { return gameStatus; }
            set { gameStatus = value; }
        }

        public EGameSessionStatus SessionStatus
        {
            get { return sessionStatus; }
            set { sessionStatus = value; }
        }


        //ctors
        public Game(EGamemode gamemode, Boolean isHost = false)
        {

        }

        public Game(string sessionId, Boolean isHost = false)
        {
              
        }

        //methods
        public Boolean SetGamemode(EGamemode gamemode)
        {
            return true;
        }

        public Boolean ReadyGame()
        {
            return true;
        }

        public Boolean StartGame()
        {
            return true;
        }
        
        public Question GetQuestion()
        {
            return null;
        }
        

        public Boolean AnswerQuestion(string answer)
        {
            return true;
        }

        public string Endgame()
        {
            return null;
        }
    }
}