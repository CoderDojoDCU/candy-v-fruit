// Connect to the socket server.
var socket = io.connect('http://localhost:3000');

var alpha = ['A','B','C','D','E','F','G','H','I','J']

var image1 = {};
image1.file = "images/candy0.png";
image1.name = "candy0";
image1.type = "candy";
image1.score = -10;

var image2 = {};
image2.file = "images/candy1.png";
image2.name = "choc cup cake";
image2.type = "candy";
image2.score = -21;

var image3 = {};
image3.file = "images/candy4.png";
image3.name = "cup cake";
image3.type = "candy";
image3.score = -31;

var image4 = {};
image4.file = "images/candy5.png";
image4.name = "pretzel";
image4.type = "candy";
image4.score = -50;

var image5 = {};
image5.file = "images/candy6.png";
image5.name = "jammy dodger";
image5.type = "candy";
image5.score = -46;

var images = [image1, image2, image3, image4, image5];



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

function addImages() {
	$("#icons").empty();
	for(var imageNumber = 0; imageNumber < images.length; 
		imageNumber=imageNumber+1) {
		var image = images[imageNumber];
		var iconHtml = "<div class='icon'>";
		iconHtml = iconHtml + "<img class='gameIcon' src='"+image.file+"'";
		iconHtml = iconHtml + " onclick='moveIcon("+imageNumber+")' /img>";
		iconHtml = iconHtml + "</div>";
		$("#icons").append(iconHtml);

	}
}

function setup() {
	addImages();
}

window.onload = setup;

function moveIcon(imagePosition) {
	var image = images[imagePosition];
	alert(image.score);
}











