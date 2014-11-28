// Connect to the socket server.
var socket = io.connect('http://localhost:3000');

var alpha = ['A','B','C','D','E','F','G','H','I','J']
    
socket.on('user', function (userData) {
    addUser(userData)
});

function play() {
	var userData = {};
	var name = $("#name").val();
	userData.name = name;
	userData.id = getUserId(name);
	socket.emit('user', userData);
	drawGrid();
}

function getUserId(name) {
	var id = name;
	id = id.replace(" ", "");
	id = id.replace("'","");
	id = id + Math.floor((Math.random() * 1000000) + 1);
	return id;
}

function addUser(userData) {
	alert(userData.name);
}

function drawGrid() {
	for(var row = 0; row <= 10; row=row+1) {
		var rowHtml = '<div class="row">';
		for(var col = 0; col <= 20; col=col+1){
			var colHtml = '<div class="col"></div>';
			rowHtml = rowHtml + colHtml;
		}
		rowHtml = rowHtml + '</div>';
		$("#game").append(rowHtml);
	}
}

