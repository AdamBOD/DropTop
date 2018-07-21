var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var mongoClient = require ('mongodb').MongoClient;
// var mongoUrl = "mongodb://localhost:27017/DropTop";

var apiRouter = require('./routes/userData');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/DropTop')));
app.use('/', express.static(path.join(__dirname, 'dist/DropTop')));
app.use('/api', apiRouter);

// mongoClient.connect (mongoUrl, (dbError, db) => {
//   if (dbError) throw dbError;
//   console.log ("DB created");

//   dbo = db.db("DropTop");
//   // dbo.collection("userData").insertOne (
//   //     {
//   //         userId: "3161613264132064", data: [ {name: "Entry01", data: "https://webenv.io/spinz"} ]
//   //     },
//   //     (dbError, res) => {
//   //         if (dbError) throw dbError;
//   //         console.log (`Object inserted ${res}`);
//   //     }
//   // );

//   // dbo.collection("userData").find ({ userId: "3161613264132064" }).toArray ((dbError, res) => {
//   //     if (dbError) throw dbError;
//   //     console.log (res[0].data);
//   // });
//   db.close();
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/DropTop/index.html'));
});

module.exports = app;