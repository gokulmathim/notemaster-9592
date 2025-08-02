import React from "react";
import { useNotes } from "../contexts";

// PUBLIC_INTERFACE
export default function NotesList({ onEditNote }) {
  const { notes, loading, setSelectedNote, selectedNote, deleteNote } = useNotes();

  const handleSelect = note => {
    setSelectedNote(note);
    onEditNote(note.id);
  };

  return (
    <section className="notes-list1">
      <div className="notes-list-header">
        <h2>Your Notes</h2>
        <button className="btn accent-btn"
          onClick={() => { setSelectedNote(null); onEditNote(null); }}>
          + New
        </button>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : !notes?.length ? (
        <div className="empty-hint">No notes found. Try adding one!</div>
      ) : (
        <ul className="notes-list-ul">
          {notes.map(note => (
            <li
              key={note.id}
              className={
                selectedNote && selectedNote.id === note.id
                  ? "notes-list-item selected"
                  : "notes-list-item"
              }
              onClick={() => handleSelect(note)}
            >
              <div className="note-title">{note.title}</div>
              <div className="note-tags">
                {note.tags && note.tags.map((tag) =>
                  <span className="note-tag" key={tag}>{tag}</span>
                )}
              </div>
              <button
                className="btn tiny-btn danger"
                title="Delete"
                onClick={e => {
                  e.stopPropagation();
                  if (window.confirm("Delete this note?")) deleteNote(note.id);
                }}
              >🗑️</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
