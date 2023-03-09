// Node.js application that uses the Express framework to handle HTTP requests

// import the "dotenv" module to get access to environment variables, Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require("dotenv/config");

// import the ./db" module to connect to the database
require("./db");

// import the express module
const express = require("express");

// install the handlebars module
const hbs = require("hbs");

//define app as an instance of express
const app = express();

// call the session configuration module and pass the "app" constant as an argument
require("./config/session.config")(app);

// call the module that runs the middlewares and pass the "app" constant as an argument 
require("./config")(app);

////////////////////////////////////////////////////////////////////////////////
//don't understand this yet
// // default value for title local
// const projectName = "basic-auth";
// const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();
// app.locals.title = `${capitalized(projectName)} created with Ironlauncher`;
////////////////////////////////////////////////////////////////////////////////

// define router for homepage endpoint authentication
const index = require("./routes/index");
app.use("/", index);

// define router for authentication endpoint 
const authRouter = require("./routes/auth.routes.js_old"); // <== has to be added
app.use("/", authRouter); // <== has to be added

// define router for products endpoint 
const productRouter = require("./routes/product.routes"); // <== has to be added
app.use("/", productRouter); // <== has to be added

// define router for orders endpoint 
const orderRouter = require("./routes/order.routes"); // <== has to be added
app.use("/", orderRouter); // <== has to be added

// call the error handling module and pass the "app" constant as an argument
require("./error-handling")(app);

module.exports = app;