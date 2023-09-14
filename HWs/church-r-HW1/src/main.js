import {getRandomWord} from "./utils.js";

generateBabbles();

document.querySelector("#my-button").onclick = () => 
{
    generateBabbles();
}
document.querySelector("#higher-babbles").onclick = () => 
{
    generateBabbles(5);
}
function generateBabbles(num=1)
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