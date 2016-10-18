(function () {
  "use strict";

  var express = require('express');
  var app = express();
  var path = require("path");
<<<<<<< HEAD
  var fs = require('fs');
  var mime = require('mime');
  var PORT  = process.env.PORT || 8080;
=======
>>>>>>> parent of 3b9acea... add stream to send pdf

  app.set("port", PORT);
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


  app.get("/resume/pdf", function(req, res) {
    res.sendFile(path.join(__dirname,"/assets/tyalo_vladimir.zip"));
  });


<<<<<<< HEAD
  app.get("/resume/:file", function (req, res) {
    var fullName = path.join(__dirname, "/assets/" + req.params.file);

    var fileName = path.basename(fullName);
    var mimeType = mime.lookup(fullName);

    res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
    res.setHeader('Content-type', mimeType);
=======
  app.get("/resume/pdf/:file", function(req, res) {
    var name = req.params.file;
    var funllName = path.join(__dirname, "/assets/" + name);
    res.sendFile(funllName);
  });
>>>>>>> parent of 3b9acea... add stream to send pdf

  app.get("/resume/docx", function(req, res) {
    //res.sendFile(path.join(__dirname, "/assets/tyalo_vladimir_resume.zip"));
  });


  app.get("/favicon.ico", function (req, res) {
    res.send("heroku needs favicon.ico path");
  });

  app.use(function (req, res) {
    res.sendStatus(404);
  });

  app.listen(PORT, function () {
    console.log("Node app is running on port ", PORT);
  });

})();
