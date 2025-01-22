const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const expressSession = require('express-session');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local'); 
const indexRouter = require('./routes/index');
const usersRouter = require("./routes/user")
const User = require('./models/user');
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "hey hey hey"
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes setup
app.use("/", indexRouter);
app.use("/", usersRouter);


// Start the server
app.listen(3000)
