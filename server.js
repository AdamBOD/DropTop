const express = require ('express');
const session = require ('express-session');
const app = express ();
var http = require ('http').Server (app);
const io = require ('socket.io')(http);
const path = require('path');
const fs = require ('fs');
const mongoClient = require ('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/DropTop";
let dbo = null;

const sess = "";

// mongoClient.connect (mongoUrl, (dbError, db) => {
//     if (dbError) throw dbError;
//     console.log ("DB created");

//     dbo = db.db("DropTop");
//     // dbo.collection("userData").insertOne (
//     //     {
//     //         userId: "3161613264132064", data: [ {name: "Entry01", data: "https://webenv.io/spinz"} ]
//     //     },
//     //     (dbError, res) => {
//     //         if (dbError) throw dbError;
//     //         console.log (`Object inserted ${res}`);
//     //     }
//     // );
//     dbo.collection("userData").find ({ userId: "3161613264132064" }).toArray ((dbError, res) => {
//         if (dbError) throw dbError;
//         console.log (res[0].data);
//     });
//     db.close();
// });

app.use (express.static ('public'));
app.use('/content', express.static(path.join(__dirname, 'public/assets/content')));
app.use('/images', express.static(path.join(__dirname, 'public/assets/images')));
app.use('/scripts', express.static(path.join(__dirname, 'public/assets/scripts')));
app.use('/styles', express.static(path.join(__dirname, 'public/assets/styles')));

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
        console.log (sess)
    });

    socket.on ('setName', (data) => {
        console.log (`Set username: ${data}`);
        let returnData = dbo.collection("userData").find ({ userId: "3161613264132064" }).toArray ((dbError, res) => {
            if (dbError) throw dbError;
            console.log (res[0].data);
        });
        socket.emit ("welcome", returnData);
    });

    socket.on ('screenRequest', (data) => {
        console.log (`User requested screen: ${data}`)
        console.log (__dirname + '/public/assets/content/' + data + '.txt')
        fs.readFile ('./public/assets/content/' + data + '.txt', {encoding: "utf8"}, (fileData) => {
            console.log ("Sending screen");
            console.log (fileData)
            socket.emit ('screenSent', fileData);
        });        
    });
});
