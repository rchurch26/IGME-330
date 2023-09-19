import {getRandomWord, loadBabble} from "./utils.js";

let words1, words2, words3;

const babbleLoaded = json => 
{
    // words1 = json.words1;
    // words2 = json.words2;
    // words3 = json.words3;
    ({words1, words2, words3} = json);
    generateBabbles(1);
    document.querySelector("#my-button").onclick = () => generateBabbles(1);
    document.querySelector("#higher-babbles").onclick = () => generateBabbles(5);
}

const generateBabbles = num =>
{
    document.querySelector("#output").innerHTML = "";
    // const babble = `${getRandomWord(words1)} ${getRandomWord(words2)} ${getRandomWord(words3)}`;
    // document.querySelector("#output").innerHTML = babble;
    for(let i = 0; i < num; i++)
    {
        const babble = `${getRandomWord(words1)} ${getRandomWord(words2)} ${getRandomWord(words3)}`;
        document.querySelector("#output").innerHTML += `${babble}<br>`;
    }
}
loadBabble(babbleLoaded);