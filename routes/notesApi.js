const api = require('express').Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET route to get all notes
api.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});


// POST route to create new note
api.post("/notes", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    // write to db.json
    readAndAppend(newNote, "./db/db.json");
    // construct response
    const response = {
      status: 'Successly added note',
      body: newNote,
    };
    res.json(response);
  } else {
    res.json('Error adding new note');
  }
});


// DELETE route to delete note

module.exports = api;

