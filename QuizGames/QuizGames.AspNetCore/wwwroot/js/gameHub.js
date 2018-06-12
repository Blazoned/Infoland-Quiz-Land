//
// Variables

// Custom event constant
const scoreUpdated =
    {
        Dispatch: function (playerId, score) {
            this.handlers.forEach((func) => {
                func(playerId, score);
            });
        },
        handlers: []
    };

const playerJoined =
    {
        Dispatch: function (users) {
            this.handlers.forEach((func) => {
                func(users);
            });
        },
        handlers: []
    };

const gameStarted =
    {
        Dispatch: function () {
            this.handlers.forEach((func) => {
                func();
            });
        },
        handlers: []
    };

const clientConnected =
    {
        Dispatch: function () {
            this.handlers.forEach((func) => {
                func();
            });
        },
        handlers: []
    };

// Contains the connected players & your player name
var players = new Array();

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

// Client attempted to start the game
connection.on("GameStarted", function (isStartable) {
    if (isStartable)
        gameStarted.Dispatch();
});

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
    else if (playerClients === -3) {
        // Alert and redirect to previous page
        alert("The game has already started!");
        history.go(-1);
    }
    else {
        // Get local username
        let playerName = getCookie("playerName");

        // Get local user and remaining users
        let locPlayer = playerClients.find((player) => { return player.playerId === playerName; });
        let remPlayers = Array();

        // Add previously connected clients to player list
        for (let i = 0; i < playerClients.length; i++) {
            // Add remaining players to player list
            if (playerClients[i].playerId !== playerName)
                remPlayers[i] = playerClients[i];
        }

        // Set the player list
        players = remPlayers;
        players.unshift(locPlayer);

        // Notify console
        console.log("Connected!");
        clientConnected.Dispatch();
    }
});

// A player connected to the game
connection.on("PlayerConnected", function (player) {
    // Add player to the player list
    players[players.length] = player;
    playerJoined.Dispatch(players);

    // Send the clients current score to the newly connected player
    connection.invoke("SendScore", players[0].score);
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

    // Dispatch score update event
    scoreUpdated.Dispatch(player.playerId, score);
});

//
// Start connection and attempt to join the game
connection.start()
    .then(function () {
        connection.invoke("JoinGame", getCookie("playerName"));
    })
    .catch(function (error) {
        console.error(error.toString());
    });