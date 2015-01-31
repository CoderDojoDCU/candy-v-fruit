var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var data = require('./gamedata.json');
var fs = require('fs');

var gameStarted = false;
var startTime;

var server = app.listen(3000, function() {
    stateTime = data.started;
    console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

app.get('/newgame', function(req, res){
    gameStarted = true;
    stateTime = new Date();
    res.send('Be cool');
});

app.get('/gameon', function(req, res){
   res.send(isGameOn());
});

app.post('/addplayer', function(req, res) {
   console.log(req.body);
   console.log(data.players);
   addPlayer(req.body.id, req.body.name);
   res.status(200).jsonp(req.body);
});

function addPlayer(id, name) {
  var player = {};
  player.id = id;
  player.name = name;
  data.players.push(player);
  console.log(data.players);
  updateGameDataToFile();
}

function updateGameDataToFile() {
  fs.writeFile('./gamedata.json', 
    JSON.stringify(data, null, 4), 
    function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to file");
      }
  }); 
}

function isGameOn() {
	if(startTime && startTime != "") {
		var timeOut = 1000 * 60 * 10;
		var now = new Date();
		if(Math.abs(now - startTime) < timeOut) {
			return true;
		}
	}
	return false;
}

io.on('connection', function (socket) {
  console.log('emitting');
  socket.on('shot', function (data) {
  	console.log('emitting 2');
    console.log(data);
    socket.broadcast.emit('shot',  data);
  });
});