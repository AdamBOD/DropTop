var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var apiRouter = require('./routes/userData');
var loginRouter = require('./routes/loginData');
var mongoose = require('mongoose');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/DropTop')));
app.use('/', express.static(path.join(__dirname, 'dist/DropTop')));
app.use('/login', loginRouter);
app.use('/api', apiRouter);

mongoose.connect('mongodb://localhost/DropTop', { promiseLibrary: require('bluebird') })
  .then((data) =>  {
    console.log('connection successful')
  })
  .catch((err) => console.error(err));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

app.get ('api/userData', (req, res) => {

});

app.post ('api/userData', (req, res) => {

});

app.put ('api/userData', (req, res) => {

});

app.get ('api/login', (req, res) => {
  res.send ("Login Portal");
});

app.post ('api/login', (req, res) => {
  res.send ("Login");
});

app.put ('api/login', (req, res) => {
  res.send ("Register");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/DropTop/index.html'));
});

module.exports = app;