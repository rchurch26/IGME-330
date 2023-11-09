class circleSprite
{
	constructor(centerX,centerY,divergence,c,lifetime=100)
	{
		Object.assign(this, {centerX,centerY,divergence,c,lifetime});
		this.speed = 1;
        this.petalSize = 2;
	}

    dtr(degrees){
        return degrees * (Math.PI/180);
    }

    drawCircle(ctx,x,y,radius,color){
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

	draw(ctx)
	{
		for(let n=0; n < this.lifetime; n++)
            {
                let a = n * this.dtr(this.divergence);
                let r = this.c * Math.sqrt(n);
                let x = r * Math.cos(a) + this.centerX;
                let y = r * Math.sin(a) + this.centerY;
                let aDegrees = (n * this.divergence) % 361;
                let color = `hsl(${aDegrees},100%,50%)`;
                this.drawCircle(ctx,x,y,this.petalSize,color);
                this.divergence += 2;
                this.c += .0005;
                this.petalSize += .005;
            }
	}
}

export{circleSprite}