import React, { useState } from "react";
import { Note } from "../types";
import { useNotes } from "../context/NotesContext";
import "../styles/NoteItem.css";

interface Props {
  note: Note;
  deleteNote: (id: string) => void;
}

const NoteItem: React.FC<Props> = ({ note, deleteNote }) => {
  const { editNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedNote: Note = {
      ...note,
      title: newTitle,
      content: newContent,
    };
    editNote(note.id, updatedNote);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(note.title);
    setNewContent(note.content);
  };

  return (
    <div className="note-item">
      {!isEditing ? (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div className="button-container">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        </>
      ) : (
        <div className="edit-container">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Edit title"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Edit content"
          />
          <div className="button-container">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
