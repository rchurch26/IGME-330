import * as map from "./map.js";
import * as ajax from "./ajax.js";

let btn1 = document.querySelector("#btn-1");
let btn2 = document.querySelector("#btn-2");
let btn3 = document.querySelector("#btn-3");
let btn4 = document.querySelector("#btn-4");
let btn5 = document.querySelector("#btn-5");
let poi;

const loadPOI = () =>
{
    const url = "https://people.rit.edu/~acjvks/shared/330/igm-points-of-interest.php";

    const poiLoaded = jsonString =>
    {
        poi = JSON.parse(jsonString);
        console.log(poi);

        for(let p of poi) 
        {
            map.addmarker(p.coordinates, p.title, "A POI!", "marker");
        }
    }

    ajax.downloadFile(url,poiLoaded);
}

const init = () =>
{
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
    setupUI();
}

const setupUI = () => {
    // it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
    const lnglatRIT = [-77.67454147338866, 43.08484339838443];
    const lnglatIGM = [-77.67990589141846, 43.08447511795301];

    //RIT @ Zoom 15.5
    btn1.onclick = () =>
    {
        map.setZoomLevel(15.5);
        map.setPitchAndBearing(0,0);
        map.flyTo(lnglatRIT);
    }

    //RIT @ Isometric View
    btn2.onclick = () =>
    {
        map.setZoomLevel(15.5);
        map.setPitchAndBearing(45,0);
        map.flyTo(lnglatRIT);
    }

    //World @ Zoom 0
    btn3.onclick = () =>
    {
        map.setZoomLevel();
        map.setPitchAndBearing(0,0);
        map.flyTo();
    }

    //IGM @ Zoom 18
    btn4.onclick = () =>
    {
        map.setZoomLevel(18);
        map.setPitchAndBearing(0,0);
        map.flyTo(lnglatIGM);
    }

    //Load Some Markers
    btn5.onclick = () =>
    {
        if(!poi)
        {
            loadPOI();
        }
    }
  }

export {init};