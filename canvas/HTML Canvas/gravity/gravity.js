//setting up the canvas to full screen

const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//readying our pen with which we are going to draw
let c = canvas.getContext("2d");

//--------------------------------------------------------------//
let g = 1; //(m/s^2) 
let e = 0.92; 
let colorArray = ['#390099', '#9E0059', '#FF0054', '#FF5400', 'FFBD00'];

function randomX(start, end){

    return (Math.random()*(end - start));
}

function randomY(start, end){

    return (Math.random()*(end - start));
}

function randomColor(arr){

    return arr[Math.floor(Math.random()*arr.length)]
}

class object {

    constructor(x, y, dy, radius, color) {

        this.x = x;
        this.y = y;
        // this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        // this.minRadius = radius;
        this.color = color;

        this.draw = ()=>{

            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
            c.fillStyle = this.color;
            c.fill();
        }

        this.update = ()=>{

            if(this.y + this.radius + this.dy> canvas.height){

                //e is the restitution factor
                this.dy = -this.dy * e;
            }

            else{
                
                this.dy += g;
            }

            this.y += this.dy;
            this.draw();
        }
    }
}

objectArray = [];

for (let i = 0; i < 500; i++) {

    objectArray.push(new object(randomX(0, canvas.width), randomY(0, canvas.height/2), 1, 50, randomColor(colorArray)));
}

console.log(objectArray);

function anime(){

    requestAnimationFrame(anime);

    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < objectArray.length; i++) {
        
        objectArray[i].update();
    }
}

anime();
