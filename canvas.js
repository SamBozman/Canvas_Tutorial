var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 80;
var minRadius = 10;
var maxNumCircles = 800;
var spacing = 100; //Spacing between mouse and cicles
var xSpeed = 2;
var ySpeed = 2;

var colorArray = [
    '#16193B',
    '#35478C',
    '#4E7AC7',
    '#7FB2F0',
    '#ADD5F7',
];



class Circle {

    constructor(x, y, dx, dy, radius) {
        var minRadius;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    update() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.y += this.dy;
        this.x += this.dx;

        //Interactivity
        if (mouse.x - this.x < spacing && mouse.x - this.x > -spacing && mouse.y - this.y < spacing && mouse.y - this.y > -spacing) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

}

var circleArray = [];
//Create an array of unique circles
for (var i = 0; i < maxNumCircles; i++) {
    var dx = (Math.random() - 0.5) * xSpeed;
    var dy = (Math.random() - 0.5) * ySpeed;
    var radius = (Math.random() * minRadius) + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}



//Animate each circle using the circle Array.update
function animate() {
    requestAnimationFrame(animate);

    //Clear the screen each time we create a new circle
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();

    }

}


window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

window.addEventListener('resize',
    function(event) {
       canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
    });


animate();