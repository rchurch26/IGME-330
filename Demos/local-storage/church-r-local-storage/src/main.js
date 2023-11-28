import * as storage from "./storage.js"
let items;

const addBtn = document.querySelector("#btn-add");
const input = document.querySelector("#thing-text");
const clearBtn = document.querySelector("#btn-clear");


// I. declare and implement showItems()
// - this will show the contents of the items array in the <ol>
const showItems = () => {
  // loop though items and stick each array element into an <li>
  // use array.map()!
  // update the innerHTML of the <ol> already on the page
  document.querySelector(".ml-4").innerHTML = items.map(i => `<li>${i}</li>`).join("");
};

// II. declare and implement addItem(str)
// - this will add `str` to the `items` array (so long as `str` is length greater than 0)
const addItem = str => {
  str = str.trim();
  if(str.length > 0)
  {
    items.push(str);
    storage.writeToLocalStorage("items", items);
    showItems();
  }
};


// Also:
// - call `addItem()`` when the button is clicked, and also clear out the <input>
// - and be sure to update .localStorage by calling `writeToLocalStorage("items",items)`
addBtn.onclick = () =>
{
  addItem(input.value);
  input.value = "";
}

// When the page loads:
// - load in the `items` array from storage.js and display the current items
// you might want to double-check that you loaded an array ...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// ... and if you didn't, set `items` to an empty array
const init = () =>
{
  items = storage.readFromLocalStorage("items");
  if(!Array.isArray(items))
  {
    items = [];
  }
  showItems();
}
init();

// Got it working? 
// - Add a "Clear List" button that empties the items array
clearBtn.onclick = () =>
{
  items = [];
  document.querySelector(".ml-4").innerHTML = "";
}