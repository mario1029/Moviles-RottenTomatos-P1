"use strict";
const express = require("express");
const { cors } = require("./middlewares/middlewares");
const app = express();
const routes = require("./routes/index.js");
const session = require("express-session");
const passport = require("passport");
const { LocalStrategy } = require("./utils/strategies");
app.use("/views", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "superkey",
    resave: false,
    saveUninitialized: false,
}));
app.use(cors);
app.get("/", (req, res) => {
    res.send("hi, estas en el inicio");
});
passport.use(LocalStrategy);
passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
});
passport.deserializeUser((user, done) => {
    done(null, JSON.parse(user));
});
app.use(passport.initialize());
app.use(passport.session());
console.log("hi2");
app.use("/", routes);
module.exports = app;
//# sourceMappingURL=index.js.map