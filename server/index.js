const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

const movies = require('./movies.json');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/movies/list', (req, res) => {
    res.send(movies);
});

app.get('/movie/:id', (req, res) => {
    const id = req.params.id;
    const movie = movies.find((movie) => movie.id == id);
    res.send(movie);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});