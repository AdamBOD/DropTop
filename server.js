const express = require ('express');
const app = express ();
var http = require ('http').Server (app);

app.use (express.static ('public'));

app.get ('/', (req, res) => {
    res.sendFile ('/index.html');
});

http.listen (56630, () => {
    console.log ('Listening on 56630');
})