import * as map from "./map.js";

const init = () =>
{
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
}

export {init};