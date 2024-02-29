var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors")

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");


var app = express();


app.use("/api/auth", authRouter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/index", indexRouter);
app.use(cors());


module.exports = app;
