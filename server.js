const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes.splice(1));
});

function addNote(body, savedNotes) {
  const newNote = body;

  if (savedNotes.length === 0) {
    newNote.id = 0;
  } else {
    newNote.id = savedNotes[savedNotes.length - 1].id + 1;
  }

  savedNotes.push(newNote);

  try {
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(savedNotes)
    );
  } catch (err) {
    console.error('Error writing to file:', err);
    return null;
  }

  return savedNotes;
}

app.post('/api/notes', (req, res) => {
  res.json(addNote(req.body, notes));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
