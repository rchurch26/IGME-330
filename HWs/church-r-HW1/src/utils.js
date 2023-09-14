function getRandomWord(array)
{
    return array[Math.floor(Math.random() * array.length)];
}

export {getRandomWord};