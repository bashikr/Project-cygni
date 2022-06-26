/**
 * app.js is the main file that takes the responsibility
 * of creating and turning on the server.
 */
"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 1337;
const cors = require("cors");
const errorMiddleware = require("./middleware/error.handler.js");
const httpServer = require("http").createServer(app);

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const index = require("./routes/index.route.js");

app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", index);

app.use(errorMiddleware.middleWare);
app.use(errorMiddleware.notFoundError);
app.use(errorMiddleware.errorResult);

const server = httpServer.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);

module.exports = server;
