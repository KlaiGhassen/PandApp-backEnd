require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var parking =require("./routes/parking")
var clubRouter = require("./routes/club");
var usersRouter = require("./routes/users");
var eventRouter =require("./routes/eventPost")
var app = express();

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//connection to data base
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DataBase"));
app.use("/parking",parking );
app.use("/club", clubRouter);
app.use("/user", usersRouter);
app.use("/event", eventRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
