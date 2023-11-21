/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils';
import * as audio from './audio';
import * as visualizer from './visualizer';
import DrawParams from './interfaces/drawParams.interface';
import { DEFAULTS } from './enums/main-defaults.enum';

let canvasElement = document.querySelector("canvas"); // hookup <canvas> element

const drawParams:DrawParams = 
{
  showBars      : true,
  showCircles   : true,
  showWaveform  : false
};

// 1 - here we are faking an enumeration
// const DEFAULTS = Object.freeze({
// 	sound1  :  "media/New Adventure Theme.mp3"
// });

const init = json => {
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  document.querySelector("#title").innerHTML = json.title;
  document.querySelector("#select-track").innerHTML = json.sounds.map(s => `<option value="${s.file}">${s.name}</option>`).join("");
  audio.setupWebaudio(DEFAULTS.sound1);
	setupUI(canvasElement);
  visualizer.setupCanvas(canvasElement,audio.analyserNode);
  loop();
}

const setupUI = (canvasElement:HTMLCanvasElement) => {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs") as HTMLButtonElement;
  // B - hookup play button
  const playButton = document.querySelector("#btn-play") as HTMLButtonElement;
  // C - hookup volume slider & label
  let volumeSlider = document.querySelector("#slider-volume") as HTMLInputElement;
  let volumeLabel = document.querySelector("#label-volume") as HTMLSpanElement;
  //D - hookup track <select>
  let trackSelect = document.querySelector("#select-track") as HTMLSelectElement;

  let waveSelect = document.querySelector("#select-form") as HTMLSelectElement;
  //Hookup checkboxes
  let barsCB = document.querySelector("#cb-bars") as HTMLInputElement;
  let circlesCB = document.querySelector("#cb-circles") as HTMLInputElement;
  let trebleCB = document.querySelector("#cb-treble") as HTMLInputElement;
  let bassCB = document.querySelector("#cb-bass") as HTMLInputElement;
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  //Add .onclick event to button
  playButton.onclick = e =>
  {
    const target = e.target as HTMLInputElement;
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    //Check if context is in suspended state (autoplay policy)
    if(audio.audioCtx.state == "suspended")
    {
        audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if(target.dataset.playing == "no")
    {
        //If track is paused, play it
        audio.playCurrentSound();
        target.dataset.playing = "yes";//CSS will set text to "Pause"
        //If track is playing, pause it
    }else
    {
        audio.pauseCurrentSound();
        target.dataset.playing = "no";//CSS will set text to "Play"
    }
  };

  // Add .oninput event to slider
  volumeSlider.oninput = e =>
  {
    const target = e.target as HTMLInputElement;
    //Set the gain
    audio.setVolume(Number(target.value));
    //Update value of label to match value of slider
    //const sliderVal:Number = Math.round((target.value/2 * 100));
    volumeLabel.innerHTML = String(Math.round((Number(target.value)/2 * 100)));
  };
  //Set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  //Add .onchange event to <select>
  trackSelect.onchange = e =>
  {
    const target = e.target as HTMLInputElement;
    audio.loadSoundFile(target.value);
    //Pause the current track if it is playing
    if(playButton.dataset.playing == "yes")
    {
        playButton.dispatchEvent(new MouseEvent("click"));
    }
  }

  waveSelect.onchange = e =>
  {
    const target = e.target as HTMLInputElement;
    if(target.value == "waveform-data") drawParams.showWaveform = true;
    else drawParams.showWaveform = false;
  }
	
  //Add .onclick event to checkboxes
  barsCB.onclick = () =>
  {
    if(barsCB.checked) drawParams.showBars = true;
    else drawParams.showBars = false;
  }
  circlesCB.onclick = () =>
  {
    if(circlesCB.checked) drawParams.showCircles = true;
    else drawParams.showCircles = false;
  }
  trebleCB.onchange = e =>
  {
    const target = e.target as HTMLInputElement;
    audio.toggleTreble(target.checked);
  }
  bassCB.onchange = e =>
  {
    const target = e.target as HTMLInputElement;
    audio.toggleBass(target.checked);
  }
  canvasElement.onclick = e =>
  {
    const target = e.target as HTMLInputElement;
    let rect = target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    visualizer.drawOnClick(mouseX, mouseY);
  }
} // end setupUI

function loop(){
    /* NOTE: This is temporary testing code that we will delete in Part II */
        setTimeout(loop, 1000/60);
        visualizer.draw(drawParams);
}

utils.loadData(init);

export {init};