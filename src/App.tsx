// src/App.tsx
import React from "react";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import { NotesProvider } from "./context/NotesContext";
import "./App.css";
const App: React.FC = () => {
  return (
    <NotesProvider>
      <div>
        <h1>Notes App</h1>
        <NoteForm />
        <NoteList />
      </div>
    </NotesProvider>
  );
};

export default App;
