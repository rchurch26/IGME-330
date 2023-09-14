const getRandomWord = (array) => array[Math.floor(Math.random() * array.length)];

const loadBabble = () =>
{
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) =>
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

        const words1 = json.words1;
        const words2 = json.words2;
        const words3 = json.words3;
    }
}

export {getRandomWord};