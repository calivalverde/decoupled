const functions = require("firebase-functions");
const express = require("express");
const apiRoutes = require("./routes/");

//init app
const app = express();

// api routes
app.use("/api", apiRoutes);

exports.app = functions.https.onRequest(app);
