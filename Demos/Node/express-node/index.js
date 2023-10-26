const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/random-word', (req, res) => {
    const words = ["Puppies", "Kittens", "Frogs", "Curry Chicken", "Snowmen"];
    const word = words[Math.floor(Math.random() * words.length)];
    res.send(word);
})

app.listen(3000);
console.log(`Listening on port ${port}`);