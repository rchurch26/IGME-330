import { onValue, favoritesPath } from "./firebase.js";

const parks = {
    "p79"   : "Letchworth State Park",
    "p20"   : "Hamlin Beach State Park",
    "p180"  : "Brookhaven State Park",
    "p35"   : "Allan H. Treman State Marine Park",
    "p118"  : "Stony Brook State Park",
    "p142"  : "Watkins Glen State Park",
    "p62"   : "Taughannock Falls State Park",
    "p84"   : "Selkirk Shores State Park",
    "p43"   : "Chimney Bluffs State Park",
    "p200"  : "Shirley Chisholm State Park",
    "p112"  : "Saratoga Spa State Park"
  };

  const favoritesChanged = (snapshot) => {
    // TODO: clear #park-list
    document.querySelector("#park-list").innerHTML = "";
    snapshot.forEach(fav => {
      const childKey = fav.key;
      const childData = fav.val();
      console.log(childKey,childData);
      // TODO: update #favoritesList
      document.querySelector("#park-list").innerHTML += `<li>${childKey} Likes: ${childData.likes}</li>`;
    });
  };

  onValue(favoritesPath, favoritesChanged);