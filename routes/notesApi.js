const api = require('express').Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./helpers/fsUtils");

// GET route to get all notes


// POST route to create new note


// DELETE route to delete note

module.exports = api;

