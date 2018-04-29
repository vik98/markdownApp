var express = require("express");
var app = express();
var sharejs = require("share");
var redis = require("redis");
var client = redis.createClient();

app.set('view engine', 'ejs');

app.use(express.static("public"))

app.get("/", function(req, res){
  res.render("view");
});

app.get('/(:id)', function(req, res) {
  res.render('view');
});

var options = {
  db: {type: 'redis'},
};
//Forces it to use redis as the database
sharejs.server.attach(app, options);

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("connected to 3000");
});
