const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { allowedNodeEnvironmentFlags } = require('process');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    res.json(db);
})

app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
          title,
          text
        };
    
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
      } else {
        res.error('Error when adding note');
      }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);