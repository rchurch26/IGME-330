/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils';
import DrawParams from './interfaces/drawParams.interface';
import circleSprite from './classes/circleSprite';
let ctx:CanvasRenderingContext2D,canvasWidth:number,canvasHeight:number,analyserNode:AnalyserNode,audioData:Uint8Array;
const sprites = [];

const setupCanvas = (canvasElement:HTMLCanvasElement,analyserNodeRef:AnalyserNode) => {
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
	// keep a reference to the analyser node
	analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize/2);
	//Create Sprites
	sprites.push(new circleSprite(200, 200, 137.4, 2, audioData.length/2));
    sprites.push(new circleSprite(450, 200, 137.1, 1, audioData.length/2));
}

const draw = (params:DrawParams) => {
	let avgLoudness = 0;
  // 1 - populate the audioData array with the frequency data from the analyserNode
	// notice these arrays are passed "by reference" 
	//analyserNode.getByteFrequencyData(audioData);
	// OR
	//analyserNode.getByteTimeDomainData(audioData); // waveform data
	
	if(params.showWaveform) analyserNode.getByteTimeDomainData(audioData);
	else analyserNode.getByteFrequencyData(audioData);
	
	// 2 - draw background
	ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.restore();

	//Get average loudness
	for(let i=0; i<audioData.length; i++)
		{
			avgLoudness += audioData[i];
		}
	// 4 - draw bars
	if(params.showBars)
	{
		let barSpacing = 4;
		let margin = 5;
		let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
		let barWidth = screenWidthForBars / audioData.length;
		let barHeight = 200;
		let topSpacing = 100;

		ctx.save();
		ctx.fillStyle = 'rgba(255,255,255,0.50)';
		ctx.strokeStyle = 'rgba(0,0,0,0.50)';
		//Loop through data and draw
		for(let i=0; i<audioData.length; i++)
		{
			ctx.fillRect(margin + i * (barWidth + barSpacing),topSpacing + 256-audioData[i],barWidth,barHeight);
			ctx.strokeRect(margin + i * (barWidth + barSpacing),topSpacing + 256-audioData[i],barWidth,barHeight);
			//Possibly draw sprites
		}
		ctx.restore();
	}
	
	// 5 - draw circles
	if(params.showCircles)
	{
		let maxRadius = canvasHeight/4;
		ctx.save();
		ctx.globalAlpha = 0.5;
		for(let i=0; i<audioData.length; i++)
		{
			//red-ish circles
			let percent = audioData[i] / 255;

			let circleRadius = percent * maxRadius;
			ctx.beginPath();
			ctx.fillStyle = utils.makeColor(255, 111, 111, 0.34 - percent/3.0);
			ctx.arc(canvasWidth/2, canvasHeight/2, circleRadius, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();

			//blue-ish circles, bigger, more transparent
			ctx.beginPath();
			ctx.fillStyle = utils.makeColor(0, 0, 255, 0.10 - percent/10.0);
			ctx.arc(canvasWidth/2, canvasHeight/2, circleRadius * 1.5, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();

			//yellow-ish circles, smaller
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = utils.makeColor(200, 200, 0, 0.5 - percent/5.0);
			ctx.arc(canvasWidth/2, canvasHeight/2, circleRadius * 0.5, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
		ctx.restore();
	}
	avgLoudness = avgLoudness/audioData.length;
	sprites.forEach(s =>
		{
			s.petalSize = 0.05 + avgLoudness / 70;
			s.draw(ctx);
		})
}

const drawOnClick = (x:number,y:number) =>
{
	sprites.push(new circleSprite(x,y,135,1,audioData.length/2));
	let latest = sprites.length - 1;
	sprites[latest].draw(ctx);
}

export {setupCanvas,draw,drawOnClick};