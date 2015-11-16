
var pause = function() {
	console.log("clicked")
}
// the time at the start is set to 0
var time = 0; 

// takes the time and logs it to the console in minutes
var updateTime = function() {
	var runningTime = time/60;
	console.log(runningTime +" "+"minute(s)");
};

// sets the boundaries to the player
var boundaries = {
    widthLimit: 615,
    heightLimit: 355
};

//move allows the player to move using arrow keys
var move = function(player, level) {
	var level = $('#' + level.levelName);
	var player = $('#' + player.name);
	var diff = level - player;
	var array = {};
	var x = 10;
	function newv(oldv,a,b) {
		var n = parseInt(oldv, 10) - (array[a] ? x : 0) + (array[b] ? x : 0);
		return n < 0 ? 0 : n > diff ? diff : n;
	}
	$(window).keydown(function(e) { 
		array[e.which] = true; 
	});
	$(window).keyup(function(e) { 
		array[e.which] = false; 
	});
	setInterval(function() {
		player.css({
	    	left: function(i,v) { 
	    			return Math.min(boundaries.widthLimit, newv(v, 37, 39)); 
	    		},
	    	top: function(i,v) { 
	    			return Math.min(boundaries.heightLimit, newv(v, 38, 40)); 
	    		}
		});
	}, 20);

}

//checks if two divs are touching each other
var collisionDetect = function(one,two) {
	if (one.x < (two.x + two.width) && (one.x + one.width) > two.x && one.y < (two.y + two.height) && (one.height + one.y) > two.y) {
		//one.gravity = false;
		console.log("detect");
	}
	else {
		//one.gravity = true;
	}
}

//levelCreator creates levels
function levelCreator(levelName,x,y,z,width,height,color,border) {
    this.levelName = levelName;
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;
    this.color = color;
    this.border = border;
    // the createLevel function gives the levels the attributes
    this.createLevel = function() {
        var levelName = this.levelName;
        $('#content').append("<div></div>").attr("id",this.levelName).css({"width": this.width, "height": this.height,
         "left": this.x, "top":this.y, "z-index": this.z,"background-color": this.color, "border" : this.border,
          "position": "relative", "overflow":"hidden"});
    }
    this.reset = function(code) {
        this.password = code;
        var key = 1567876546787654345678976543456784;
        if (this.password === key) {
            $("#" + this.levelName).remove();
        }
        else {
            $("#" + this.levelName).append("ERROR! Something is wrong, click reload.");
        }
    }
}

function player (name,x,y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.height = 23;
    this.width = 21;
    this.gravity = true;
	this.gravityCheck = function() {
		var name = $("#" + this.name);
		var press = false;
		$(window).keydown(function(e) {
			switch (e.which) {
				case 38:
					name.stop()
					var press = true;
				break;
				case 40:
					name.stop()
					var press = true;
				break;
				default:
			}
		});
		$(window).keyup(function(e) {
			switch (e.which) {
				case 38:
					var press = false;
				break;
				case 40:
					var press = false;
				break;
				default:
			}
		});
		if (this.gravity == true && press == false) {
			name.animate({top: boundaries.heightLimit},2000);
		}
	}
    this.createPlayer = function() {
        $('#player').append("<div></div>").attr("id",this.name).attr("class","player").css({"border": "2px solid", 
        "height":"23px", "width":"21px", "margin-top":"10px", "margin-left":"10px", "-webkit-border-radius":"6px", 
        "left": this.x, "top":this.y, "background-color":"white", "position":"absolute"});
    };
}

function platform (x,y,width,height,borderRadius) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.borderRadius = borderRadius;
    this.createPlatform = function() {
    	$('#platform').append('<div></div>').attr("class","platform").css({"height": this.height, "width": this.width,
    	"border": "1px solid", "margin-top": this.y, "margin-left": this.x, "background-color": "#A4382B", 
    	"-webkit-border-radius": this.borderRadius, "position":"absolute"});
    };
}

// "test" is the name, 20 is x, 20 is y, -2 is z-index, 650 is the width, 390 is the height "#A4FBFF" is background, and "2px solid" is background
var level = new levelCreator("test", 20, 20, -2, 650, 390, "#A4FBFF", "2px solid");

// "player1" is the name, 26 is the x, and 41 is the y
var player1 = new player("player1", 26, 41);

// 300 is the x, 40 is the y, 50 is the width, 10 is the height, and 5 is the border radius
var platform1 = new platform(50,50,50,10,5);

// runs the function to create the level
level.createLevel();
//level.reset(1567876546787654345678976543456784);

// creates player and adds it into the player div
player1.createPlayer();

// creates platform and adds it into the platform div
platform1.createPlatform();

// allows the player to move, with limits based on boundaries set
move(player1,level); 

//updates the time and also runs the function to check the gravity
var gameTime = setInterval(function() {
	time++;
	updateTime();
	player1.gravityCheck();
}, 1000);

setInterval(function(){
		collisionDetect(platform1,player1);
		//console.log(player1.gravity)
},1);


