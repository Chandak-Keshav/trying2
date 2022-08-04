const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let object1 = canvas.getContext('2d');

//fill style before the rect is inherited
object1.fillStyle = 'rgba(255, 0, 0, 0.3)';
object1.fillRect(100, 100, 100, 100);
object1.fillRect(200, 200, 100, 100);
object1.fillStyle = 'rgba(0, 255, 0, 0.3)';
object1.fillRect(300, 300, 100, 100);

//Line
let c = canvas.getContext('2d');
c.beginPath();

//start from here
c.moveTo(50, 300);

//draw till here
c.lineTo(300, 100);

//draw till here again
c.lineTo(400, 200);

//draw till here again
c.lineTo(50, 10);
c.strokeStyle = "#fa34a3";
//now put that stroke 
c.stroke();


// Arc/Circle
c.beginPath();
c.arc(500, 200, 50, 0, 2*Math.PI, false);

//we have created an outline but what is it?
c.stroke();

const context = canvas.getContext('2d');
context.clearRect(0, 0, canvas.width, canvas.height);

for(let i = 0; i < 100; i++)
{
    let x = Math.random()*window.innerWidth;
    let y = Math.random()*window.innerHeight;

    let r = Math.random()*255;
    let g = Math.random()*255;
    let b = Math.random()*255;
        
    c.strokeStyle = `rgba(${r}, ${g}, ${b})`;
    c.beginPath();
    c.arc (x, y, 50, 0, 2*Math.PI, false);
    c.stroke();
}