var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session= require('express-session');
const facebookStrategy= require('passport-facebook').Strategy;
const config = require('./bin/config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  resave:false,
  saveUninitialized:true,
  secret:'PHRASESECRET'
}));

app.use(passport.initialize());
app.use(session());
passport.serializeUser((user,cb)=>{
  cb(null,user);
});
passport.deserializeUser((id,done)=>{
  User.findById(id,(err,user)=>{
    done(err,user)
  })
  return done(null,id)
});

passport.use(new facebookStrategy({
  clientID:config.facebookAuth.clientID,
  clientSecret:config.facebookAuth.clientSecret,
  callbackURL:config.facebookAuth.callbackURL,
  profileFields:['id','displayName','name','genre','picture.type']

},(token,refreshToken,profile,cb)=>{
  console.log(profile)
  return cb(null,profile);
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
