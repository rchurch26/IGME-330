import * as map from "./map.js";
import * as ajax from "./ajax.js";

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];
let geojson;
let favoriteIds = ["p20","p79","p180","p43"];
let selectedId;



// II. Functions
const refreshFavorites = () =>
{
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	for(const id of favoriteIds)
	{
		favoritesContainer.appendChild(createFavoriteElement(id));
	}
};

const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector("#btn-1").onclick = () =>
	{
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatNYS);
	}
	
	// NYS isometric view
	document.querySelector("#btn-2").onclick = () =>
	{
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45,0);
		map.flyTo(lnglatNYS);
	}
	
	// World zoom 0
	document.querySelector("#btn-3").onclick = () =>
	{
		map.setZoomLevel(3);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatUSA);
	}

	document.querySelector("#fav-btn").onclick = () => 
	{
		addFavorite(selectedId);
		showFeatureDetails(selectedId);
		refreshFavorites();
	}

	document.querySelector("#delete-btn").onclick = () =>
	{
		deleteFavorite(selectedId);
		showFeatureDetails(selectedId);
		refreshFavorites();
	}

	refreshFavorites();
}

const getFeatureById = (id) =>
{
	return geojson.features.find((obj) => obj.id == id);
}

const showFeatureDetails = (id) => {
	selectedId = id;
	console.log(`showFeatureDetails - id=${id}`);
	const feature = getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;
	document.querySelector("#details-2").innerHTML = `Address: ${feature.properties.address}<br>
	Website: <a href = "${feature.properties.url}">${feature.properties.url}</a><br>
	Phone Number: <a href = "tel:${feature.properties.phone}">${feature.properties.phone}</a>`;
	document.querySelector("#details-3").innerHTML = `${feature.properties.description}`;
	document.querySelector("#controls").className = "is-active";
	if(favoriteIds.find((fav) => fav == selectedId)) 
	{
		document.querySelector("#delete-btn").disabled = false;
		document.querySelector("#fav-btn").disabled = true;
	}
	else
	{
		document.querySelector("#delete-btn").disabled = true;
		document.querySelector("#fav-btn").disabled = false;
	}
};

const createFavoriteElement = (id) =>
{
	const feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id;
	a.onclick = () =>
	{
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
	}
	a.innerHTML = `<span class="panel-icon">
	<i class="fas fa-map-pin"></i>
	</span>
	${feature.properties.title}`;
	return a;
}

const addFavorite = id =>
{
	favoriteIds.push(id);
}

const deleteFavorite = id =>
{
	if(favoriteIds.find((fav) => fav == id))
	{
		const idIndex = favoriteIds.indexOf(id);
		favoriteIds.splice(idIndex,1);
	}
}

const init = () => {
	map.initMap(lnglatNYS);
	ajax.downloadFile("data/parks.geojson", (str) => 
	{
		geojson = JSON.parse(str);
		console.log(geojson);
		map.addMarkersToMap(geojson, showFeatureDetails);
		setupUI();
	});
};

init();