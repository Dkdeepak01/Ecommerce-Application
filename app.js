var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session =require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var validateUserRouter = require("./routes/passwordValidator");
var newSignupRouter = require("./routes/newSignup");
var productPageData = require("./routes/productdetail");
var addNewData = require("./routes/addProducts");
var checkUserLogInRouter=require("./routes/checkUserLogIn");
var logOutUserRouter=require("./routes/logOutUser");

var app = express();
app.use(session({secret:'seckey',cookie:{maxAge: 6000}}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/users/login/data", validateUserRouter);
app.use("/new/user/login", newSignupRouter);
app.use("/product/page/data", productPageData);
app.use("/add/new/products",addNewData);
app.use("/check/user/login",checkUserLogInRouter);
app.use("/log/out/user",logOutUserRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
