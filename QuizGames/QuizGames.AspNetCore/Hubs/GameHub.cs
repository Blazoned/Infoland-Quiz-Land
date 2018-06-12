using Microsoft.AspNetCore.SignalR;
using QuizGames.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizGames.AspNetCore.Hubs
{
    public class GameHub : Hub
    {
        // Contains a global count of players (game management)
        public static List<GameViewModel> players;
        public static bool gameState = false;

        // A client starts the game
        public async Task StartGame()
        {
            await Clients.All.SendAsync("GameStarted", players.Count == 4);

            // Started game
            gameState = true;
        }

        // A client attempts to join the game
        public async Task JoinGame(string playerId)
        {
            // Return if game started
            if (gameState)
            {
                await Clients.Caller.SendAsync("GameConnected", -3);
                return;
            }

            if (players == null || players.Count < 4)
            {
                // Check if the player is already in game
                if (players != null && players.Count((item) => { return item.PlayerId == playerId; }) >= 1)
                {
                    await Clients.Caller.SendAsync("GameConnected", -2);
                    return;
                }

                // Create player
                GameViewModel player = new GameViewModel(Context.ConnectionId, playerId);

                // Create a player list (if null) add the new connection
                players = players ?? new List<GameViewModel>();
                players.Add(player);

                // Send the connection to the other players and confirm connection and retrieve currently connected players
                await Clients.Others.SendAsync("PlayerConnected", player);
                await Clients.Caller.SendAsync("GameConnected", players);
            }
            else
            {
                // Affirm connection
                await Clients.Caller.SendAsync("GameConnected", -1);
            }
        }

        // A client attempts to leave the game
        public async Task LeaveGame()
        {
            if (players.Count(item => { return item.ConnectionId == Context.ConnectionId; }) >= 1)
            {
                // Get player
                GameViewModel player = players.First(item => { return item.ConnectionId == Context.ConnectionId; });

                // Remove the player from the list
                players.Remove(player);

                // Reset gamestate if all players have left
                gameState = gameState && players.Count <= 0 ? false : gameState;

                // Reset the player score
                await Clients.Others.SendAsync("ReceiveScore", player, 0);

                // Send disconnection to other players and confirm disconnection
                await Clients.Others.SendAsync("PlayerDisconnected", player);
                await Clients.Caller.SendAsync("GameDisconnected", true);
            }
            else
            {
                // Affirm disconnection (can't disconnect when not connected)
                await Clients.Caller.SendAsync("GameDisconnected", false);
            }
        }

        // A player attempts to update their (online) score
        public async Task SendScore(int score)
        {
            // Send score to other clients
            await Clients.Others.SendAsync("ReceiveScore", players.First((item) => { return item.ConnectionId == Context.ConnectionId; }), score);
        }
    }
}
