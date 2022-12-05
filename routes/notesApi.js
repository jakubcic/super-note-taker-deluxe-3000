const api = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const stringTemplateParser = require("../helpers/parser");

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
      status: "Successly added note",
      body: newNote,
    };
    res.json(response);
  } else {
    res.json("Error adding new note");
  }
});

// DELETE route to delete note by id
api.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  console.log(noteId);
  // read from db.json as promise
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // filter for note matching noteId (I want to display in response)
      const noteToDelete = json.filter((note) => note.id === noteId);
      // if noteToDelete is not empty
      if (noteToDelete.length > 0) {
        // filter out note matching noteId
        const notesToKeep = json.filter((note) => note.id !== noteId);
        // write filtered notes to db.json
        writeToFile("./db/db.json", notesToKeep);
        // construct response
        // use our helper function so we can write a nice status message in the response :)
        const statusMessage = stringTemplateParser(
          "Successfully deleted note with id {{id}}",
          noteToDelete[0]
        );
        const response = {
          status: "Success",
          message: statusMessage,
          body : {
            deleted: noteToDelete
          }
        };
        res.json(response);
      } else {
        // construct response
        const idQuery = {
          id: noteId,
        }
        // use stringTemplateParser helper
        const statusMessage = stringTemplateParser(
          "Unable to find note with id {{id}}",
          idQuery
        );
        const response = {
          status: "Error",
          message: statusMessage,
        };
        res.json(response);
      }
    });
});

// bonus: GET route to get a specific note by id
api.get("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  console.log(noteId);
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // find note in array by id
      const specificNote = json.find((note) => note.id === noteId);

      // construct response if note not found
      if (!specificNote) {
        
        const idQuery = {
          id: noteId,
        }
        // use stringTemplateParser helper
        const statusMessage = stringTemplateParser(
          "Unable to find note with id {{id}}",
          idQuery
        );
        const response = {
          status: "Error",
          message: statusMessage,
        };
        res.json(response);
      } else {
        // construct response if note found
        const response = {
          status: "Success",
          body: specificNote,
        };
        res.json(response);
      }
    });
});

module.exports = api;
