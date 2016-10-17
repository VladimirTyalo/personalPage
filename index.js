(function () {
  "use strict";

  var express = require('express');
  var app = express();
  var path = require("path");
  var fs = require('fs');
  var mime = require('mime');

  app.set("port", (process.env.PORT || 8080));
  app.use(express.static(path.join(__dirname, 'build')));

  app.engine('html', require('ejs').renderFile);


  app.set('view engine', 'html');
  app.set("views", path.join(__dirname, "/build"));

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/index", function (req, res) {
    res.redirect("/");
  });

  app.get("/resume", function (req, res) {
    res.send("Not implemented yet");
  });


  app.get("/resume/pdf", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/tyalo_vladimir.zip"));
  });


  app.get("/resume/:file", function (req, res) {
    var fullName = path.join(__dirname, "/assets/" + req.params.file);

    var fileName = path.basename(fullName);
    var mimeType = mime.lookup(fullName);

    //res.setHeader('Content-disposition', 'attachment; filename=' + fileName); // to download as attachment
    res.setHeader('Content-disposition', 'filename=' + fileName); // to open pdf in browser
    res.setHeader('Content-type', mimeType);

    var filestream = fs.createReadStream(fullName);
    filestream.pipe(res);
  });

  app.get("/favicon.ico", function (req, res) {
    res.send("heroku needs favicon.ico path");
  });

  app.use(function (req, res) {
    res.sendStatus(404);
  });

  app.listen(app.get("port"), function () {
    console.log("Node app is running on port ", app.get("port"));
  });

})();
