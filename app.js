var express = require('express');
var app = express();
var path = require('path');

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
  console.log('emitting');
  socket.on('user', function (data) {
  	console.log('emitting 2');
    console.log(data);
    socket.broadcast.emit('user',  data);
  });
});