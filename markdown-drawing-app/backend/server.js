const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectare la MongoDB
mongoose.connect("mongodb://localhost:27017/notes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema și model pentru notițe
const noteSchema = new mongoose.Schema({
  markdown: String,
  drawing: String,
});

const Note = mongoose.model("Note", noteSchema);

// Endpoint pentru salvarea notițelor
app.post("/api/notes", async (req, res) => {
  const { markdown, drawing } = req.body;
  const newNote = new Note({ markdown, drawing });
  await newNote.save();
  res.send("Notiță salvată!");
});

// Endpoint pentru încărcarea notițelor
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.listen(port, () => {
  console.log(`Serverul rulează pe http://localhost:${port}`);
});
