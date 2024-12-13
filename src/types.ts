// src/types.ts

export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface NotesContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  editNote: (id: string, updatedNote: Note) => void;
  deleteNote: (id: string) => void;
  searchNotes: (keyword: string) => void;
}
