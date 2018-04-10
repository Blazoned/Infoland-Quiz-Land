using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuizGames.Models
{
    public enum EGameSessionStatus
    {
        Guest,
        SessionHost,
        PlayerReady,
        InGame,
        Disconnected
    }
}