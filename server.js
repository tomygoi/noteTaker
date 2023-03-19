const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
} )

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/api/notes', (req, res) => {
    res.send(JSON.stringify(notes));
})

function addNote(body, savedNotes) {
    const newNote = body;
    body.id = savedNotes[0];
    savedNotes[0]++;
    savedNotes.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(savedNotes));
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = addNote(req.body, notes);
    res.json(newNote);
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));