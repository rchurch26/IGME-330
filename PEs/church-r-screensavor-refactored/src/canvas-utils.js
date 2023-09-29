//Canvas Helpers
const drawRectangle = (ctx,x,y,width,height,fillStyle="black",lineWidth=0,strokeStyle="black") =>
{
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.rect(x,y,width,height);
    ctx.fill();
    if(lineWidth > 0)
    {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}

const drawArc = (ctx,x,y,radius,fillStyle="black",lineWidth=0,strokeStyle="black",startAngle=0,endAngle=Math.PI*2,globalAlpha=0.3) =>
{
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    if(lineWidth > 0)
    {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
    }
    ctx.globalAlpha = globalAlpha;
    //arc(x,y,radius,start angle(radians),end angle(radians),counter clockwise bool)
    ctx.arc(x,y,radius,startAngle,endAngle,false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

const drawLine = (ctx,x1,y1,x2,y2,lineWidth=1,strokeStyle="black") =>
{
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.restore();
}

export {drawRectangle, drawArc, drawLine};