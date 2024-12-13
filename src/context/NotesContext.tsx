import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Note, NotesContextType } from "../types";

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const NotesProvider: React.FC<Props> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
      setFilteredNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    setFilteredNotes(notes);
  }, [notes]);

  const addNote = (note: Note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const editNote = (id: string, updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? updatedNote : note))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const searchNotes = (keyword: string) => {
    const result = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase()) ||
        note.content.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredNotes(result);
  };

  return (
    <NotesContext.Provider
      value={{
        notes: filteredNotes,
        addNote,
        editNote,
        deleteNote,
        searchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = React.useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
