const express = require('express');
const app = express();
const initializeDatabase = require("./app/models/index.js");
const router = require("./app/routes/index.js");

initializeDatabase();
app.use(express.json());
app.use("/api", router);

module.exports = app;