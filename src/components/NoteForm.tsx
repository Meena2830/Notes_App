import React, { useState } from "react";
import { useNotes } from "../context/NotesContext";
import { Note } from "../types";
import "../styles/NoteForm.css";

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addNote } = useNotes();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
      };
      addNote(newNote);
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
