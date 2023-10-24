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

let title, sounds, info;

const drawParams = 
{
  showBars      : true,
  showCircles   : true,
  showWaveform  : false
};

const dataLoaded = json =>
{
  ({title, sounds, info} = json);
}

utils.loadData(dataLoaded);

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/New Adventure Theme.mp3"
});

const init = () => {
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  document.querySelector("#title").innerHTML = title;
  document.querySelector("#select-track").innerHTML = sounds.map(s => `<option value="${s.file}">${s.name}</option>`).join("");
  document.querySelector("#info").innerHTML = `<p>${info}</p>`;
  audio.setupWebaudio(DEFAULTS.sound1);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
	setupUI(canvasElement);
  visualizer.setupCanvas(canvasElement,audio.analyserNode);
  loop();
}

const setupUI = canvasElement => {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs");
  // B - hookup play button
  const playButton = document.querySelector("#btn-play");
  // C - hookup volume slider & label
  let volumeSlider = document.querySelector("#slider-volume");
  let volumeLabel = document.querySelector("#label-volume");
  //D - hookup track <select>
  let trackSelect = document.querySelector("#select-track");

  let waveSelect = document.querySelector("#select-form");
  //Hookup checkboxes
  let barsCB = document.querySelector("#cb-bars");
  let circlesCB = document.querySelector("#cb-circles");
	
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

  waveSelect.onchange = e =>
  {
    if(e.target.value == "waveform-data") drawParams.showWaveform = true;
    else drawParams.showWaveform = false;
  }
	
  //Add .onclick event to checkboxes
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
  document.querySelector("#cb-treble").onchange = e =>
  {
    audio.toggleTreble(e.target.checked);
  }
  document.querySelector("#cb-bass").onchange = e =>
  {
    audio.toggleBass(e.target.checked);
  }
} // end setupUI

function loop(){
    /* NOTE: This is temporary testing code that we will delete in Part II */
        setTimeout(loop, 100/60);
        visualizer.draw(drawParams);
}

export {init};