using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizGames.ViewModels
{
    public class GameViewModel
    {
        public string ConnectionId { get; set; }
        public string PlayerId { get; set; }
        public int Score { get; set; }

        public GameViewModel(string connId, string playerId)
        {
            this.ConnectionId = connId;
            this.PlayerId = playerId;
        }
    }
}
