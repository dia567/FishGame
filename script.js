const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';


// Mouse Interactivity
let canvasPositon = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}


canvas.addEventListener('mousedown', function (event) {
    mouse.click = true;
    mouse.x = event.x - canvasPositon.left;
    mouse.y = event.y - canvasPositon.top;
  
});
canvas.addEventListener('mouseup', function () {
    mouse.click = false;
})

// Player 
const playerLeft = new Image()
playerLeft.src = 'playerLeft.png'
class Player {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.radius = 30;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 498;
        this.spriteheight = 327;
    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= dx/10;
            
        }
        if (mouse.y != this.y) {
             this.y -= dy/10;
            
        }



    }
    draw() {
        if (mouse.click) {
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'red';
        ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius, 10);
        ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteheight, this.spriteWidth, this.spriteheight, this.x -40, this.y-30, this.spriteWidth/6, this.spriteheight/6 )
    }
}

const player = new Player();

// Bubbles 
const bubblesArray = [];
 class Bubble{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height+100;
        this.radius = 30;
        this.speed = Math.random() * 5 + 1;
        this.distance ;
        this.counded = false;
         
     
    }

    update(){
        this.y -= this.speed ;
        const dx = this.x - player.x;
        const dy = this.y - player.x;
        this.distance = Math.sqrt(dx*dx+dy*dy);
    }
    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}
const sond = document.createElement('audio');
sond.src = 'sond1.mp4'
 function handleBubble(){
    if(gameFrame %50 == 0 ){
        bubblesArray.push(new Bubble());
  
    }
    for(let i = 0; i < bubblesArray.length; i++){
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        if(bubblesArray[i].y<0-bubblesArray[i].radius*2){
            bubblesArray.splice(i,1)
        }   
        if(bubblesArray[i].distance < bubblesArray[i].radius+ player.radius){
            // console.log("con")
            if(!bubblesArray[i].counded){
                sond.play()
                score++;
                bubblesArray[i].counded = true;
                bubblesArray.slice(i,1);
            }
            
        }
        
    }
 }

// Animation Loop
function animate() {
    // ctx.cleaRect(0,0,canvas.width,canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBubble();
    player.update();
    player.draw();
    gameFrame++;
    ctx.fillStyle = 'black'
    ctx.fillText("score: "+score,10,50)
    requestAnimationFrame(animate);
}
animate();  