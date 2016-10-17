(function () {
  "use strict";

  var express = require('express');
  var app = express();
  var path = require("path");

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


  app.get("/resume/pdf", function(req, res) {
    res.sendFile(path.join(__dirname,"/assets/tyalo_vladimir_pdf_resume.zip"));
  });

  app.get("/resume/docx", function(req, res) {
    res.sendFile(path.join(__dirname, "/assets/tyalo_vladimir_docx_resume.zip"));
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
