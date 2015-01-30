var express = require('express');
var app = express();
var path = require('path');

var gameStarted = false;
var startTime;

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/newgame', function(req, res){
    gameStarted = true;
    stateTime = new Date();
});

app.get('/gameon', function(req, res){
   return isGameOver();
});

function isGameOver() {
	if(startTime) {
		var timeOut = 1000 * 60 * 10;
		var now = new Date();
		if(Math.abs(now - startTime) > timeOut) {
			return true;
		}
	}
	return false;
}

io.on('connection', function (socket) {
  console.log('emitting');
  socket.on('user', function (data) {
  	console.log('emitting 2');
    console.log(data);
    socket.broadcast.emit('user',  data);
  });
});