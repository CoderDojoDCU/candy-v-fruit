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
image2.name = "candy1";
image2.type = "candy";
image2.score = -21;

var image3 = {};
image3.file = "images/candy4.png";
image3.name = "candy3";
image3.type = "candy";
image3.score = -30;

var image4 = {};
image4.file = "images/candy5.png";
image4.name = "candy4";
image4.type = "candy";
image4.score = -50;

var image5 = {};
image5.file = "images/candy6.png";
image5.name = "candy6";
image5.type = "candy";
image5.score = -50;

var fruit1 = {};
fruit1.file = "images/fruit1.png";
fruit1.name = "fruit1";
fruit1.type = "fruit";
fruit1.score = 75;

var fruit2 = {};
fruit2.file = "images/fruit2.png";
fruit2.name = "fruit2";
fruit2.type = "fruit";
fruit2.score = 100;

var easterEgg = {};
easterEgg.file = "images/coder.png";
easterEgg.name = "easteregg";
easterEgg.type = "easteregg";
easterEgg.score = 0;

var images = [image1, image2, image3, image4, image5, fruit1, fruit2, easterEgg];

var score = 0;

socket.on('user', function (userData) {
    addUser(userData)
});

function startUp() {
	$( "#welcome" ).dialog(({
	   modal: true,
	   open: function(){
	      jQuery('.ui-widget-overlay').bind('click',function(){
	         dialogopen.dialog('close');
	      });
	   },
	   width: "500px"
}));
}

function addPlayer() {
	var userData = {};
	var name = $("#name").val();
	userData.name = name;
	userData.id = getUserId(name);
	//send this to server as post json
	ajaxCall("POST", "/addplayer", userData, 
		addPlayerSuccess, addPlayerFailed);
}

function addPlayerFailed() {
	//error here for non unique name

}

function addPlayerSuccess(data) {
	console.log(data);
	var startDate = new Date(data);
	createCountDown(startDate);
}

function createCountDown(startDate) {
	if(startDate > new Date()) {
		drawGrid();
		$( "#welcome" ).dialog( "close" );
		countDown(startDate);
	} else {
		alert('Game started, please wait');
	}
}

function countDown(startDate) {
	var now = new Date();
	var timeout = (startDate.getTime() - now.getTime())/1000;
	if(timeout > 0) {
		$("#info").text(timeout);
		setTimeout(function() {
			countDown(startDate)
		}, 200);
	} else {
		initialiseScore();
		getPlayers();
	}
}

function initialiseScore() {
	score = 0;
	$("#infoTitle").text("SCORE");
	$("#info").text(score);
}

function getPlayers() {
	ajaxCall("GET", "/players", '', loadPlayers);
}

function loadPlayers(players) {
	
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
	launchGame();
	addImages();
	startUp();
}

function launchGame() {
	ajaxCall("GET", "gameon", null,function (data) {
        console.log(data);
    });
}

function ajaxCall(type, url, data, success, error) {
	var body = JSON.stringify(data);
    $.ajax({
            type : type,
            url : url,
            data : body,
            success : function(response) {
            	console.log("SUCCESS: ", success);
            	success(response)
            },
            dataType : "json",
            contentType : 'application/json',
            error : function(jqXHR, textStatus, errorThrown) {	
               console.log(jqXHR)
               try {
	               	if(jqXHR.responseJSON) {
	               	   console.log("Error returned "+jqXHR.responseJSON.error)
		               error(jqXHR.responseJSON) 
		            } else {
		            	var response = jQuery.parseJSON(jqXHR.responseText)
		                error(response) 
		            }
	            } catch (err) {
	            	console.log(err);
	            }
            }
    });
}

window.onload = setup;

function moveIcon(imagePosition) {
	var image = images[imagePosition];
}

function resetGame() {
	ajaxCall('GET', '/cleargame', '',
		function (data) {
			alert('cleared');
		}, function (err) {
			console.log(err);
		});
}



