const express = require ('express');
const app = express ();
var http = require ('http').Server (app);
const io = require ('socket.io')(http);

app.use (express.static ('public'));

app.get ('/', (req, res) => {
    res.sendFile ('/index.html');
});

http.listen (56630, () => {
    console.log ('Listening on 56630');
});

io.on ('connection', (socket) => {
    console.log (`User @${socket.id} has connected`);
    socket.on ('disconnect', () => {
        console.log (`User @${socket.id} has disconnected`);
    });

    socket.on ('setName', (data) => {
        console.log (`Set username: ${data}`);
    })
});
