import { useEffect, useMemo, useState } from "react";
import './App.css'
import { loadXHR } from "./ajax";
import { readFromLocalStorage, writeToLocalStorage } from "./storage";
import Footer from "./footer.jsx";

const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

  // call searchAmiibo() with "mario" and our callback function
  //searchAmiibo("mario", parseAmiiboResult); // DONE

const App = () => {
  const savedTerm = useMemo(() => readFromLocalStorage("term") || "", []);
  const[term, setTerm] = useState(savedTerm);
  const [results, setResults] = useState([]);
  useEffect(() => {
    writeToLocalStorage("term", term);
  }, [term]);

  
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
    setResults(json.amiibo);
  };

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
        <span 
          key={amiibo.head + amiibo.tail} 
          style={{color:"green"}}
        >
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
    <Footer 
      name="Ace Coder"
      year={new Date().getFullYear()}
    />
  </>;
};

export default App;
