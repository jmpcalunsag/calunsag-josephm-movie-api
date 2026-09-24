const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

let movies = [];

let nextId = 1;

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find((m) => m.id === Number(req.params.id));

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.json(movie);
});

app.post('/api/movies', (req, res) => {
  const { title, genre, year } = req.body;

  if (!title || !genre || !year) {
    return res.status(400).json({
      error: 'title, genre, and year are required'
    });
  }

  const newMovie = {
    id: nextId++,
    title,
    genre,
    year: Number(year)
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
