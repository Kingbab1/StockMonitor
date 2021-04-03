// ********************************************************     Setting up global env variables     *************************************************
const express = require("express");
const mongoose = require("mongoose");
const dbConnections = require("./Connections/Database_Credentials.json");
const dojoYahooAPIHook = require("./Hooks/yahoo_finance_dojo");
//---------------------------------------------------------------------------------------------------------------------------------------------------

// ********************************************************     express app     *********************************************************************
const app = express();
const port = process.env.PORT || 8080;
//---------------------------------------------------------------------------------------------------------------------------------------------------

// ********************************************************     Database connection setup/maintenance     *******************************************
const dbURL = dbConnections[0].users[0].connection_String;
const connected = false;
const connectDB = function () {
  mongoose
    .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => (connected = true))
    .catch((err) => {
      console.log("Failed to connect to DB: [" + err + "]");
      connected = false;
    });
};
//---------------------------------------------------------------------------------------------------------------------------------------------------

// ********************************************************     Setting up CRUD operations     ******************************************************

// root get method to check server
app.get("/", (req, res) => {
  var date = new Date();
  res.send(
    "Server Up: Date [ " +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " >>>  " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      " ]"
  );
});

// get method to show the status of the Database connections and API's
app.get("/status", (req, res) => {
  let retValue = {
    "Database": connected,
    "API's": {
      "dojo_Yahoo": true,
    }
  };

  res.send(retValue);
});

// get method to retrieve Stock Summary data
app.get("/stocksummary/:ticker/:region", (req, res) => {
  dojoYahooAPIHook
    .get_stock_summary(req.params.ticker, req.params.region)
    .then((message) => {
      res.send(message);
    })
    .catch((message) => {
      res.send("ERROR : [ " + message + " ] ");
    });
});
//---------------------------------------------------------------------------------------------------------------------------------------------------

// ********************************************************     Test region to test the functionallity of certain methods and their returns     *****
app.get("/test/:ticker/:region", (req, res) => {
  dojoYahooAPIHook
    .get_stock_summary(req.params.ticker, req.params.region)
    .then((message) => {
      res.send(message);
    })
    .catch((message) => {
      res.send("ERROR : [ " + message + " ] ");
    });
});
//---------------------------------------------------------------------------------------------------------------------------------------------------

// ********************************************************     Listener     ************************************************************************
app.listen(port, () => {
  console.log(" Serceris server is running on port [" + port + "]");
});
//---------------------------------------------------------------------------------------------------------------------------------------------------
