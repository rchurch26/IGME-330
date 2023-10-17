/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as visualizer from './visualizer.js';

const drawParams = 
{
  showGradient  : true,
  showBars      : true,
  showCircles   : true,
  showNoise     : false,
  showInvert    : false,
  showEmboss    : false
};

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/New Adventure Theme.mp3"
});

function init(){
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  audio.setupWebaudio(DEFAULTS.sound1);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
	setupUI(canvasElement);
  visualizer.setupCanvas(canvasElement,audio.analyserNode);
  loop();
}

function setupUI(canvasElement){
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
  // B - hookup play button
  const playButton = document.querySelector("#playButton");
  // C - hookup volume slider & label
  let volumeSlider = document.querySelector("#volumeSlider");
  let volumeLabel = document.querySelector("#volumeLabel");
  //D - hookup track <select>
  let trackSelect = document.querySelector("#trackSelect");
  //Hookup checkboxes
  let gradientCB = document.querySelector("#gradientCB");
  let barsCB = document.querySelector("#barsCB");
  let circlesCB = document.querySelector("#circlesCB");
  let noiseCB = document.querySelector("#noiseCB");
  let invertCB = document.querySelector("#invertCB");
  let embossCB = document.querySelector("#embossCB");
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  //Add .onclick event to button
  playButton.onclick = e =>
  {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    //Check if context is in suspended state (autoplay policy)
    if(audio.audioCtx.state == "suspended")
    {
        audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if(e.target.dataset.playing == "no")
    {
        //If track is paused, play it
        audio.playCurrentSound();
        e.target.dataset.playing = "yes";//CSS will set text to "Pause"
        //If track is playing, pause it
    }else
    {
        audio.pauseCurrentSound();
        e.target.dataset.playing = "no";//CSS will set text to "Play"
    }
  };

  // Add .oninput event to slider
  volumeSlider.oninput = e =>
  {
    //Set the gain
    audio.setVolume(e.target.value);
    //Update value of label to match value of slider
    volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
  };
  //Set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  //Add .onchange event to <select>
  trackSelect.onchange = e =>
  {
    audio.loadSoundFile(e.target.value);
    //Pause the current track if it is playing
    if(playButton.dataset.playing == "yes")
    {
        playButton.dispatchEvent(new MouseEvent("click"));
    }
  }
	
  //Add .onclick event to checkboxes
  gradientCB.onclick = e =>
  {
    if(gradientCB.checked) drawParams.showGradient = true;
    else drawParams.showGradient = false;
  }
  barsCB.onclick = e =>
  {
    if(barsCB.checked) drawParams.showBars = true;
    else drawParams.showBars = false;
  }
  circlesCB.onclick = e =>
  {
    if(circlesCB.checked) drawParams.showCircles = true;
    else drawParams.showCircles = false;
  }
  noiseCB.onclick = e =>
  {
    if(noiseCB.checked) drawParams.showNoise = true;
    else drawParams.showNoise = false;
  }
  invertCB.onclick = e =>
  {
    if(invertCB.checked) drawParams.showInvert = true;
    else drawParams.showInvert = false;
  }
  embossCB.onclick = e =>
  {
    if(embossCB.checked) drawParams.showEmboss = true;
    else drawParams.showEmboss = false;
  }
} // end setupUI

function loop(){
    /* NOTE: This is temporary testing code that we will delete in Part II */
        requestAnimationFrame(loop);
        visualizer.draw(drawParams);
}

export {init};