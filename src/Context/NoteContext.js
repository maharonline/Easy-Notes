import React, { createContext, useContext, useState } from 'react';

const NotesContext = createContext();

export const useNotesContext = () => {
  return useContext(NotesContext);
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const addComment = (noteId, comment) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, comments: [...note.comments, comment] } : note
    ));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, addComment }}>
      {children}
    </NotesContext.Provider>
  );
};
