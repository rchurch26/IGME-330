import { useState } from "react";
import './App.css'

const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

const loadXHR = (url, callback) => {
  // set up the connection
  const xhr = new XMLHttpRequest();
  xhr.onload = () => callback(xhr);
  // when the data loads, invoke the callback function and pass it the `xhr` object
  xhr.open("GET", url);
  xhr.send();
};

const searchAmiibo = (name, callback) => {
  loadXHR( `${baseurl}${name}`, callback);
};

const parseAmiiboResult = xhr => {
  // get the responseText string
  const string = xhr.responseText;
  // declare a json variable
  let json;
  // try to convert to a json object
  try
  {
    json = JSON.parse(string);
  }
  catch(error)
  {
    console.log(`ERROR: ${error} for string: ${string}`);
  }
  // log out number of results (length of json.amiibo)
  console.log(`Number of results=${json.amiibo.length}`);
  
  // loop through json.amiibo and log out character name
  for(let obj of json.amiibo)
  {
    console.log(obj.character);
  }
};

  // call searchAmiibo() with "mario" and our callback function
  //searchAmiibo("mario", parseAmiiboResult); // DONE

const App = () => {
  const[term, setTerm] = useState("mario");

  return <>
    <header>
      <h1>Amiibo Finder</h1>
    </header>
    <hr />
    <main>
      <button
        onClick={() => searchAmiibo(term, parseAmiiboResult)}
      >Search</button>
      <label>
        Name: 
        <input 
          value={term}
          onChange={e => setTerm(e.target.value.trim())}
        />
      </label>
      {results.map((amiibo) => (
        <span key={amiibo.head + amiibo.tail} style={{color:"green"}}>
          <h4>{amiibo.name}</h4>
          <img 
            width="100" 
            alt={amiibo.character}
            src={amiibo.image}
          />
        </span>
      ))}
    </main>
    <hr />
    <footer>
      <p>&copy; 2023 Ace Coder</p>
    </footer>
  </>;
};

export default App;
