// requiring express
const express = require('express');

const fs = require('fs');

const noteData = require('./db/db.json');

const path = require("path");

const port = process.env.PORT || 3001;

// This package allows you to add an id to an item
const { v4: uuidv4 } = require('uuid');

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

// this route allows you to see the notes that have been saved
app.get('/api/notes', (req, res) => res.json(noteData));

// posting a new note
app.post('/api/notes', (req, res) => {

  const note = req.body;

  note.id = uuidv4();

  noteData.push(note);

  fs.writeFile('./db/db.json', JSON.stringify(noteData));

  res.json(note);
});

app.delete('/api/notes/:id', (req,res) => {

const deleteNote = req.params.id;

const notes = require("./db/db.json");

console.log(notes)
const noteIndex = notes.findIndex(note => note.id === deleteNote);
notes.splice(noteIndex, 1);
console.log(notes)
fs.writeFile('./db/db.json', JSON.stringify(notes));
return res.send();
});


app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
