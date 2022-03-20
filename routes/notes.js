const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils.js');

notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received`);
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post('/notes', (req, res) => {

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
          title,
          text
        };
    
        readAndAppend(newNote, "./db/db.json");
        res.json(`Note added successfully 🚀`);
      } else {
        res.error('Error when adding note');
      }
});

module.exports = notes;

