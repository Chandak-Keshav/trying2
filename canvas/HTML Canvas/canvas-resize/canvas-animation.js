const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

c.beginPath();
c.arc(300, 300, 100, 0, 2*Math.PI, false);
c.strokeStyle = 'green';
c.stroke();

c.clearRect(0, 0, innerWidth, innerHeight);

//-----------------------------------------//

let maxRadius = 40; let givenRadius = Math.random()*6;
let colorArray = ['#390099', '#9E0059', '#FF0054', '#FF5400', 'FFBD00'];

let mouse = {

    x: undefined,
    y: undefined
}

class Circle {

    constructor(x, y, dx, dy, radius) {

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

        this.draw = ()=>{

            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
            
            c.fillStyle = this.color;
            c.fill();
        }

        this.update = ()=>{

            if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
                this.dx = -this.dx;
            }
        
            if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
                this.dy = -this.dy;
            }
        
            this.x += this.dx;
            this.y += this.dy;

            //interactivity with the user
            if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){

                if(this.radius < maxRadius){

                    this.radius += 1;
                }
            }

            else if(this.radius > this.minRadius){

                this.radius -= 1;
            }
            
            this.draw();
        }
    }
}

let circleArr = [];

for(let i = 0; i < 1000; i++)
{
    circleArr.push(new Circle(Math.random()*(canvas.width - (2*givenRadius)) + givenRadius, Math.random()*(canvas.height - (2*givenRadius))+ givenRadius, (Math.random()-0.5)*7, (Math.random()-0.5)*7, givenRadius));
}

console.log(circleArr);

function anime(){
    requestAnimationFrame(anime);

    c.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < circleArr.length; i++){
        
        circleArr[i].update();
    }
}

anime();

window.addEventListener('mousemove',
(event)=>{

    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})