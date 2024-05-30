import React, { useEffect, useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import DrawingCanvas from "./DrawingCanvas";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [markdown, setMarkdown] = useState("");
  const [drawing, setDrawing] = useState("");

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const saveNote = () => {
    const note = { markdown, drawing };
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }).then(() => {
      setNotes([...notes, note]);
      setMarkdown("");
      setDrawing("");
    });
  };

  return (
    <div className="app">
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
      <DrawingCanvas drawing={drawing} setDrawing={setDrawing} />
      <button onClick={saveNote}>Salvează Notița</button>
      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <div className="markdown-preview">
              <ReactMarkdown>{note.markdown}</ReactMarkdown>
            </div>
            <img src={note.drawing} alt="Desen" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
