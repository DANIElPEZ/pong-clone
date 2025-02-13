const btn=document.querySelector('button');
const scoreui=document.querySelector('.score');
const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');

canvas.width=590;
canvas.height=350;

const widthPaddle=10;
const heightPaddle=60;
const paddleSpeed=8;

const ballRadius=4;

const xPosPlayer=25;
const xPosIa=555;

let xBall=295;
let yBall=175;
let xspeedBall=4;
let yspeedBall=4;

let yPosPlayer=145;
let yPosIa=145;

let playerPoints=0;
let iaPoints=0;

//dibujado
function drawBall(){
    ctx.beginPath();
    ctx.fillStyle='#fff';
    ctx.arc(xBall,yBall,ballRadius,0,360);
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.fillStyle='#fff';
    ctx.rect(xPosPlayer,yPosPlayer,widthPaddle,heightPaddle);
    ctx.fill();

    ctx.fillStyle='#fff';
    ctx.rect(xPosIa,yPosIa,widthPaddle,heightPaddle);
    ctx.fill();
}

//colisiones
function ballCollition(){
    if (yBall<ballRadius || yBall>canvas.height-ballRadius) {
        yspeedBall=-yspeedBall;
    }

    if (xBall<ballRadius || xBall>canvas.width-ballRadius) {
        xBall=295;
        yBall=175;
    }

    if (xBall<ballRadius+4) {
        iaPoints++;
    }else if (xBall>canvas.width-ballRadius-6) {
        playerPoints++;
    }

    const paddleY1=yPosPlayer<yBall && yBall<yPosPlayer+heightPaddle;
    const paddleY2=yPosIa<yBall && yBall<yPosIa+heightPaddle;

    if((xBall<xPosPlayer+widthPaddle+ballRadius&&paddleY1) || (xPosIa-ballRadius<xBall&&paddleY2)){
        xspeedBall=-xspeedBall;
    }

    xBall+=xspeedBall;
    yBall+=yspeedBall;

    scoreui.textContent=`Player: ${playerPoints} | IA: ${iaPoints}`;
}

function paddleIaCollition(){

    if (yBall>yPosIa+heightPaddle+6) {
        if (yPosIa<canvas.height-heightPaddle) {
            yPosIa+=paddleSpeed+2;
        }
    }else if(yBall<yPosIa-6){
        if (yPosIa>0) {
            yPosIa-=paddleSpeed+1;
        }
    }

}

function paddlePlayerCollition(e){
    if (yPosPlayer<canvas.height-heightPaddle) {
        if (e.key==='s') {
            yPosPlayer+=paddleSpeed+2;
        }
    }
    
    if (yPosPlayer>0) {
        if (e.key==='w') {
            yPosPlayer-=paddleSpeed+2;
        }
    }
}

function draw(){
    //limpiar canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //dibujar
    drawBall();
    drawPaddle();

    //colisiones
    ballCollition();
    paddleIaCollition();

    //clico infinito del juego
    window.requestAnimationFrame(draw);
}

document.addEventListener('keydown',e=>{
    paddlePlayerCollition(e);
});

btn.addEventListener('click',()=>{
    btn.style.display='none';
    draw();
});
