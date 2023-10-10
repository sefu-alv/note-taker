// requiring express
const express = require("express");

const fs = require("fs");

const noteData = require('./db/db.json');

const path = require("path");

const port = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
// sets up index.html route
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// sets up notes.html route
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('api/notes', (req, res) => res.json(noteData));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
