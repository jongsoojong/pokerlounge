var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
var morgan = require('morgan');
var Hand = require('./db/hand');
var db = require('./db/index');



var app = express();

app.use(express.static("./"))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 8888;

app.get('/', function(req, res){
  res.sendFile("index.html");
})


app.get('/api/draw', function(req, res){
  request.get('https://deckofcardsapi.com/api/deck/new/draw/?count=5', function(error, response, body){
    if(error) {
      res.status(404).send(error);
    } else {
      res.status(200).send(body);
    }
  });
})

app.get('/api/info', function(req, res){
  console.log("I AM GETTING IN!!")
  Hand.find()
  .then(function(results){ //promises only take one param
    res.send(results);
  })
  .catch(function(err){
    console.log(err);
  })
})

app.post("/api/hand", function(req, res){
  console.log(req.body);
  Hand.create({"hand": req.body}, function(err, results){
    console.log(results);
    if(err) {
      console.log("AN ERROR", err);
    } else {
      res.send(req.body);
    }
  });
});

app.listen(port, function(){
  console.log("Conjuring Undead at " + port);
});
