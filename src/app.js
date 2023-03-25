var express = require("express");
const fs = require("fs");
const https = require("https");

const key = fs.readFileSync("private.key");
const cert = fs.readFileSync("certificate.crt");
var app = express();
require("./db/conn");
const router = require("../src/router/router");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

require("dotenv").config();
var port = process.env.PORT || 3000;

const cred = {
  key,
  cert,
};

var path = require("path");

// app.use(express.static(path.join(__dirname, "../public")));
var ejs = require("ejs");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

app.use("/", router);

// app.listen(port);

const httpsServer = https.createServer(cred, app);
httpsServer.listen(8443);
