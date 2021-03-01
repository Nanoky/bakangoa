const express = require("express");
const bodyParser = require("body-parser");
const logs = require("debug")("logs");
const error = require("debug")("error");
const debug = require("debug")("http");
const compression = require("compression");


const app = express();
const http_port = 8080;


// Setting app configurations

app.use(compression());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");

    debug(req.method + ' ' + req.url + ' from ' + req.ip);
    
    next();
});


// Setting views configurations

app.set("views", "./views");
app.set("view engine", "ejs");


// Setting routes

app.get("/", (req, res, next) => {

    res.render("home", {
        host : req.hostname
    });
    res.end();

});


// Default route
app.use((req, res, next) => {

    res.end();

});

app.listen(http_port);