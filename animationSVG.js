var svg = document.getElementById("vimage");
var circleButton = document.getElementById("circle");
var dvdButton = document.getElementById("dvd");
var stopButton = document.getElementById("stop");
var clearButton = document.getElementById("clear");


var rID = 0;


var animate_Circle = function(){

    window.cancelAnimationFrame(rID);
    var x = svg.getAttribute("height") / 2;
    var y = svg.getAttribute("width") / 2;
    var radiusSize = 0;

    var upDown = true;
    

    var make_Circle = function(){
	clear();
	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	c.setAttribute("cx",x);
	c.setAttribute("cy",y);
	c.setAttribute("r",radiusSize);
	c.setAttribute("fill","blue");
	svg.appendChild(c);

	if (radiusSize < x && upDown == true){
	    radiusSize++;
	}
	else if(radiusSize == x){
	    upDown = false;
	    radiusSize--;
	}
	else if (radiusSize > 0 && upDown == false){
	    radiusSize--;
	}
	else{
	    upDown = true;
	    radiusSize++;
	}

	rID = window.requestAnimationFrame(make_Circle);
    }
    make_Circle();
};



var randomStart = function(){
    var max = 375;
    var min = 0;
    return Math.floor(Math.random() * (max -min + 1) + min);
};

var animate_DVD = function(){

    window.cancelAnimationFrame(rID);
    var x = randomStart();
    var y = randomStart();


    var bR = function(){
	x = x + 1.5;
	y = y + 1;
    };
    

    var tR = function(){
	x = x + 1.5;
	y = y - 1;
    };

    var tL = function(){
	x = x - 1.5;
	y = y - 1;
    };

    var bL = function(){
	x = x - 1.5;
	y = y + 1;
    };
	
    // 0 = bottom right; 1 = top right; 2 = top left; 3 = bottom left
    var dir = 0;
    var makeDVD = function(){
	clear();

	var width = 125;
	var height = 50;


	var c = document.createElementNS("http://www.w3.org/2000/svg", "image");
	c.setAttribute("x",x);
	c.setAttribute("y",y);
	c.setAttribute("width",width);
	c.setAttribute("height",height);
	c.setAttribute("href","https://1.bp.blogspot.com/-fSVZa40RkPs/VuGIjlYMxGI/AAAAAAAATNg/zXqS9Pzqnyc/s1600/bouncing_dvd_logo.jpg");
	
	svg.appendChild(c);

	
	var xMaxBound = svg.getAttribute("width") - width;
	var yMaxBound = svg.getAttribute("height") - height;
	
	if (dir == 0){
	    if (y >= yMaxBound){
		dir = 1;
		tR();
	    }
	    if (x >= xMaxBound){
		dir = 3;
		bL();
	    }	
	    else{
		bR();
	    }
	}

	else if (dir == 1){
	    if (x >= xMaxBound){
		dir = 2;
		tL();
	    }
	    if(y <= 0){
		dir = 0;
		bR();
	    }
	    else{
		tR();
	    }
	}

	else if (dir == 2){
	    if (y <= 0){
		dir = 3;
		bL();
	    }
	    if (x <= 0){
		dir = 1;
		tR();
	    }		
	    else{
		tL();
	    }
	}
	//last case must be dir == 3
	else{
	    if (x <= 0){
		dir = 0;
		bR();
	    }
	    if (y >= yMaxBound){
		dir = 2;
		tL();
	    }
	    else{
		bL();
	    }
	}
	rID = window.requestAnimationFrame(makeDVD);
    };
    makeDVD();
};



var stop = function(){
    window.cancelAnimationFrame(rID);
};

var clear = function(){
    while(svg.firstChild){
	svg.removeChild(svg.firstChild);
    };
};

circleButton.addEventListener("click",animate_Circle);
dvdButton.addEventListener("click",animate_DVD);
stopButton.addEventListener("click",stop);
clearButton.addEventListener("click",clear);
