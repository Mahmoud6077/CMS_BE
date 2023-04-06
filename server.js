// Dependencies
const express = require('express');
require('dotenv').config()
require('./configs/db');

// PORT Configuration
const port = process.env.PORT;

// Initailze Express
const app = express();

// Express Session and Passport
let session = require('express-session');
let passport = require('./configs/ppConfig');

// Session
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 36000000 }
}));

app.use(passport.initialize());
app.use(passport.session());

// Sharing the information with all web pages.
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

// Import Routes
const authRoute = require('./routes/auth');

// Mount Routes
app.use('/auth', authRoute);

// Node.js to look in a folder views for all the ejs files.
app.set("view engine", "ejs");

// Listen to specific port for incomming requests
app.listen(port, () => {
    console.log(`Blog App is running on ${port}`);
})

app.get("/a", (req, res) => {
    res.render("home/another");
})
