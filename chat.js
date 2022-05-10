// randomly select background color (try to avoid darker color because font color is black)
// smaller number means darker color
const pick = function() { return Math.random()*128+128; }
var color = "rgb(" + pick() + "," + pick() + ","+ pick() + ")";

function log (event) {
  //console.log('Message from server ', event.data);
    // stuff is each message typed by each user
    var stuff = JSON.parse(event);
    // used bullet <li> for each message
    var i = document.createElement('li');
    // concatenate user name with each message
    i.innerText = stuff.user+': '+stuff.message;
    // <li> tag will have background color
    i.style.backgroundColor = stuff.color;
    // each <li> tag will be added continuously
    list.appendChild(i);
}
// This URL is only for front-end websocket API
// https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

// we will need to use same Server-side and Client-side port number
// Note that I am using backticks (`), not single quote(')
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
let xhttp = new XMLHttpRequest();
xhttp.addEventListener("load",success);
xhttp.open("GET", "/port", true);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send();

function success(){
  let data = JSON.parse(xhttp.response);
// This will look like ws://localhost:3001/chat OR
// ws://randomSubUrl.herokuapp.com/chat
var HOST;
if (location.hostname === "localhost") {
    HOST = `ws://${location.hostname}:${data.port}/users/chat`;
} else {
    HOST = `wss://${location.hostname}/users/chat`;
}
// WebSocket is a builtIn API
var sock = new WebSocket(HOST);

const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name) {
        document.getElementById('name').innerHTML = name;
      }

// Register events: open, message
// Fired when a connection with a WebSocket is opened.
sock.addEventListener('open', function () { });
// Fired when data is received through a WebSocket.
sock.addEventListener('message', function receiveMsg(event) { log(event.data); });


// Fired when user hit enter key (sending messge)
theForm.addEventListener("submit", function sendMsg(event) {
    // reference: https://www.w3schools.com/jsref/event_preventdefault.asp
    event.preventDefault(); // prevent form default which refreshes the page
        
        //User types a message
        var oldmessage = blah.value;
        var message = oldmessage.toLowerCase();
        var newsent = "";
        var newmessage = message.split(" ");
        const adverbs = ["lively", "unexpectedly", "wrongly", "foolishly","secretly", "quickly", "closely", "deeply", "barely", "calmly", "rarely", "nearly", "very", "suddenly", "actually", "probably", "particulary", "directly", "really", "always", "usually", "quickly", "lively"];
        const verbs = ["run", "dodge", "jump", "eat", "play", "speak", "talk", "write", "like", "dislike", "do", "ask", "buy", "hold", "leave", "learn", "open", "try", "think"];
        const adjectives = ["beautiful", "ugly",  "weird", "strange", "random", "small", "big", "clean", "cheap", "dangerous", "useless", "stupid", "old", "young", "rich", "full", "high", "new", "simple", "single", "happy", "sad", "right", "strong", "light", "sweet", "fat", "dumb", "bright", "fun", "happy", "sunny", "cloudy", "dreary", "good"];

        for (let i = 0; i < newmessage.length; i++) {
            for (let j = 0; j < adverbs.length; j++) {
                if (newmessage[i] == adverbs[j]) {
                    newmessage[i] = adverbs[Math.round(Math.floor(Math.random() * 26))];
                }
            }
            for (let k = 0; k < verbs.length; k++) {
                if (newmessage[i] == verbs[k]) {
                    newmessage[i] = verbs[Math.round(Math.floor(Math.random() * 19))];
                }
            }
            for (let l = 0; l < adjectives.length; l++) {
                if (newmessage[i] == adjectives[l]) {
                    newmessage[i] = adjectives[Math.round(Math.floor(Math.random() * 36))];
                }
            } 
        }
        for (let i = 0; i < newmessage.length; i++) {
            newsent += newmessage[i] + " "
        }

        sock.send(JSON.stringify({
            "user": name,
            "message": newsent,
            "color": color
        }));
        blah.value='';  // after enqueue, empty message text box
    return false;   // prevent form submission
});
}
