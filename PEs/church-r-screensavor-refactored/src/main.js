import { getRandomColor, getRandomInt } from "./utils.js";
import * as canvasUtils from "./canvas-utils.js";

let ctx;
let canvas;
let paused = false;
let createRectangles = true;
let createArcs = true;
let createLines = true;

const init = () => 
{
    console.log("page loaded!");
    // #2 Now that the page has loaded, start drawing!
    
    // A - `canvas` variable points at <canvas> tag
    canvas = document.querySelector("canvas");
    
    // B - the `ctx` variable points at a "2D drawing context"
    ctx = canvas.getContext("2d");
    
    //Rectangle
    canvasUtils.drawRectangle(ctx,120,120,400,300,"black",10,"red");

    //Lines
    canvasUtils.drawLine(ctx,20,20,620,460,5,"red");
    
    canvasUtils.drawLine(ctx,620,20,20,460,5,"red");

    //Circles
    canvasUtils.drawArc(ctx,320,240,50,"orange",5,"green");
    
    canvasUtils.drawArc(ctx,320,360,50,"gray",5,"teal",0,Math.PI);

    //Eyes
    canvasUtils.drawArc(ctx,185,240,35,"white",5,"red");
    
    canvasUtils.drawArc(ctx,450,240,35,"white",5,"red");

    //Extra Line
    canvasUtils.drawLine(ctx,0,100,600,100,20,"green");

    setupUI();

    update();

    //Test Code
    // drawArc(ctx,100,100,50,"red");
    // drawArc(ctx,100,100,50,"green",10,"pink",0,Math.PI);
    // drawLine(ctx,0,100,640,300);
    // drawLine(ctx,0,100,640,300,10,"coral");
    // drawRandomArc(ctx);
    // drawRandomLine(ctx);
}

// handy helper functions!
const update = () =>
{
    if(paused) return;
    requestAnimationFrame(update);
    if(createRectangles) drawRandomRect(ctx);
    if(createArcs) drawRandomArc(ctx);
    if(createLines) drawRandomLine(ctx);
}

const drawRandomRect = ctx =>
{
    //drawRectangle(ctx,x,y,width,height,fillStyle="black",lineWidth=0,strokeStyle="black")
    canvasUtils.drawRectangle(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(30,90),getRandomInt(50,90),getRandomColor(),getRandomInt(1,20),getRandomColor());
}

const drawRandomArc = ctx =>
{
    canvasUtils.drawArc(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(0,50),getRandomColor(),getRandomInt(10,25),getRandomColor(),getRandomInt(0,Math.PI),getRandomInt(Math.PI,Math.PI*2));
}

const drawRandomLine = ctx =>
{
    canvasUtils.drawLine(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(0,640),getRandomInt(0,480),getRandomInt(5,15),getRandomColor());
}

//Event Handlers
const canvasClicked = e =>
{
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX,mouseY);

    for(let i=0;i<10;i++)
    {
        let x = getRandomInt(-100,100) + mouseX;
        let y = getRandomInt(-100,100) + mouseY;
        let radius = getRandomInt(0,50);
        let fillColor = getRandomColor();
        let lineWidth = getRandomInt(10,25);
        let strokeColor = getRandomColor();
        let startAngle = getRandomInt(0,Math.PI);
        let endAngle = getRandomInt(Math.PI,Math.PI*2);
        canvasUtils.drawArc(ctx,x,y,radius,fillColor,lineWidth,strokeColor,startAngle,endAngle);
    }
}

//Helper Functions
const setupUI = () =>
{
    document.querySelector("#btn-pause").onclick = function(){
        paused = true;
    }
    document.querySelector("#btn-play").onclick = function(){
        if(paused)
        {
            //console.log("click");
            paused = false;
            update();
        }
    }
    document.querySelector("#btn-clear").onclick = function(){
        ctx.clearRect(0,0,640,480);
    }

    canvas.onclick = canvasClicked;

    document.querySelector("#cb-rectangles").onclick = function(e){
        createRectangles = e.target.checked;
    }

    document.querySelector("#cb-arcs").onclick = function(e){
        createArcs = e.target.checked;
    }

    document.querySelector("#cb-lines").onclick = function(e){
        createLines = e.target.checked;
    }
}

// #1 call the `init` function after the pages loads
init();