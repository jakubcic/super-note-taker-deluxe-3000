const express = require("express");
const path = require("path");
// import our routes from the routes folder
const api = require("./routes/notesApi");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// use our api routes
app.use("/api", api);

// GET route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET route for homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// listen on PORT
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
});
