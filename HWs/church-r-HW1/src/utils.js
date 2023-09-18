const getRandomWord = array => array[Math.floor(Math.random() * array.length)];

const loadBabble = callback =>
{
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = e =>
    {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        let json;
        try
        {
            json = JSON.parse(e.target.responseText);
        }
        catch
        {
            document.querySelector("#output").innerHTML = "JSON.parse() failed!";
            return;
        }
        callback(json);
    }
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}

export {getRandomWord, loadBabble};