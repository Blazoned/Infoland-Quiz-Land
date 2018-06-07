//
// Variables

// Contains the connected players & your player name
var playerName; // TODO: Assign the username of a player to this variable
var players = new Array(); // TODO: Use player names to keep track of the user


//
// Create connection to game hub
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub/game")
    .configureLogging(signalR.LogLevel.Information)
    .build();

//
// Window close event (prevents players from taking up player space when they left the game)
window.onbeforeunload = function () {
    connection.invoke("LeaveGame");
};


//
// Add connection handlers

// Client attempted to connect to the game
connection.on("GameConnected", function (playerClients) {
    if (playerClients === -1) {
        // Alert and redirect to previous page
        alert("The game is already full!");
        history.go(-1);
    }
    else if (playerClients === -2)
    {
        // Alert and redirect to previous page
        alert("You're already in the game!");
        history.go(-1);
    }
    else {
        // Add previously connected clients to player list
        for (let i = 0; i < playerClients.length; i++) {
            players[i] = playerClients[i];
        }

        // Notify console
        console.log("Connected!");
    }
});

// A player connected to the game
connection.on("PlayerConnected", function (player) {
    // Add player to the player list
    players[players.length] = player;

    // Get personal score
    let index = players.findIndex(function (item) {
        return item.playerId === playerId;
    });

    // Send the clients current score to the newly connected player
    connection.invoke("SendScore", players[index].score);
});

// A player disconnected from the game
connection.on("PlayerDisconnected", function (player) {
    // Find player in the player list
    let index = players.findIndex(function (item) {
        return item.playerId === player.playerId;
    });

    // Remove the player from the list
    players.splice(index, 1);
});

// Change a player's score
connection.on("ReceiveScore", function (player, score) {
    // Find player in the player list
    let index = players.findIndex(function (item) {
        return item.playerId === player.playerId;
    });

    // Assign new score
    players[index].score = score;
});

//
// Start connection and attempt to join the game
connection.start()
    .then(function () {
        connection.invoke("JoinGame", "User Alpha");
    })
    .catch(function (error) {
        console.error(error.toString());
    });