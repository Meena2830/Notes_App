import React, { useState } from "react";
import { Note } from "../types";
import { useNotes } from "../context/NotesContext";
import NoteItem from "./NoteItem";
import "../styles/NoteList.css";

const NoteList: React.FC = () => {
  const { notes, deleteNote, searchNotes } = useNotes();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    searchNotes(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchKeyword}
        onChange={handleSearchChange}
      />
      <div>
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem key={note.id} note={note} deleteNote={deleteNote} />
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;
