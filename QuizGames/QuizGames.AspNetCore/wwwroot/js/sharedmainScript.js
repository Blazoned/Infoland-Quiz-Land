var urlLocation;

// Redirect to login if not logged in, else redirect to menu if on login page and not logged in.
$(document).ready(function () {
    var sessionId = getCookie("AuthKey");
    var username = getCookie("playerName");

    urlLocation = location.href.split("/").slice(-1)[0];
    var loggedIn = !(sessionId === "" || typeof sessionId === "undefined") || !(username === "" || typeof username === "undefined")

    if (urlLocation === "") {
        if (loggedIn) {
            location.href = "/menu/menu";
        }
    }
    else {
        if (!loggedIn) {
            location.href = "/";
        }
    }
});

function SignOff() {
    if (confirm("Wil je uitloggen?")) {
        setCookie("playerName", "", -1);
        setCookie("AuthKey", "", -1);

        location.href = "/";
    }
}

// Get object using a string
Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};

// Sets an existing cookie or creates a new one
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Gets the value of a cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Shuffle arrays
function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {

        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Get object item location
function getArrayItemByValue(objectList, objectKey, keyValue) {
    return objectList.filter(
        function (data) {
            return Object.byString(data, objectKey) === keyValue;
        });
}