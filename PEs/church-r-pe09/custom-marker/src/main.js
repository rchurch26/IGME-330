const init = () =>
{
    mapboxgl.accessToken = 'pk.eyJ1IjoicmNodXJjaDI2IiwiYSI6ImNsb3E3ZmJrZDBmMXoyaW1jOXY2M2V0Zm0ifQ.fkOlzT8nyAtZENVF4cLuzg';
    const geojson = {
    type: 'FeatureCollection',
    features: [
        {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-77.032, 38.913]
        },
        properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
        }
        },
        {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776]
        },
        properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
        }
        },
        {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-73.9937092387492, 40.75074687230236]
        },
        properties: {
            title: 'Madison Square Garden',
            description: 'New York, NY'
        }
        }
    ]
    };
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9'
    });
    map.setZoom(3);
    map.setCenter([-96,37.8]); // note the order - it's longitude,latitude - which is opposite of Google Maps
    map.addControl(new mapboxgl.NavigationControl());
    //map.setStyle('mapbox://styles/mapbox/satellite-v9'); //Valid too
    // add markers to map
    for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
    
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
    )
    .addTo(map);
    }
}

export {init};