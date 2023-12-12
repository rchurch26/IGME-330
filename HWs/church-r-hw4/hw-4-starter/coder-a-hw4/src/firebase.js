import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, onValue, increment } from  "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADnzyVAXG1tzQcG9ls25VSAK2FXM2cPkE",
	authDomain: "high-scores-cbbc5.firebaseapp.com",
	projectId: "high-scores-cbbc5",
	storageBucket: "high-scores-cbbc5.appspot.com",
	messagingSenderId: "881554578741",
	appId: "1:881554578741:web:58ef90cb87475bfa2bc07c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase();

const favoritesPath = "favorites";

const pushFavorite = (id, inc) => {
    const favRef = ref(db, `${favoritesPath}/${id}`);
    set(favRef, {
      id,
      likes: increment(inc)
  });
  };

// You might get awway with exporting fewer functions than this
export { db, favoritesPath, ref, set, pushFavorite, onValue };