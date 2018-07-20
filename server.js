const express = require ('express');
const app = express ();
var http = require ('http').Server (app);
const io = require ('socket.io')(http);
const mongoClient = require ('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/DropTop";
let dbo = null;

mongoClient.connect (mongoUrl, (dbError, db) => {
    if (dbError) throw dbError;
    console.log ("DB created");

    dbo = db.db("DropTop");
    // dbo.collection("userData").insertOne (
    //     {
    //         userId: "3161613264132064", data: [ {name: "Entry01", data: "https://webenv.io/spinz"} ]
    //     },
    //     (dbError, res) => {
    //         if (dbError) throw dbError;
    //         console.log (`Object inserted ${res}`);
    //     }
    // );
    dbo.collection("userData").find ({ userId: "3161613264132064" }).toArray ((dbError, res) => {
        if (dbError) throw dbError;
        console.log (res[0].data);
    });
    db.close();
});

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
        let returnData = dbo.collection("userData").find ({ userId: "3161613264132064" }).toArray ((dbError, res) => {
            if (dbError) throw dbError;
            console.log (res[0].data);
        });
        socket.emit ("welcome", returnData);
    })
});
