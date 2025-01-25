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
    const offset = req.query.offset || 0;
    const from = offset;
    const to = offset + 10;
    const moviesSubset = movies.slice(from, to);
    setTimeout(() => {
        res.send({movies:moviesSubset, count:movies.length});
    }, 2000);  
});

app.get('/movie/:id', (req, res) => {
    const id = req.params.id;
    const movie = movies.find((movie) => movie.id == id);
    res.send(movie);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});