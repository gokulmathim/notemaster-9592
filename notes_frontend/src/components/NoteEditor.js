import React, { useEffect, useState } from "react";
import { useNotes } from "../contexts";

// PUBLIC_INTERFACE
export default function NoteEditor({ editingNoteId, onFinishEdit }) {
  const {
    notes, createNote, updateNote, selectedNote, setSelectedNote, refresh
  } = useNotes();

  const empty = { title: "", content: "", tags: [] };
  const [form, setForm] = useState(empty);

  // Populate or reset form when selection or editing changes
  useEffect(() => {
    if (editingNoteId && selectedNote) setForm(selectedNote);
    else setForm(empty);
  // eslint-disable-next-line
  }, [editingNoteId, selectedNote?.id]);

  // If editing changes, update selectedNote from notes context
  useEffect(() => {
    if (editingNoteId && notes?.length) {
      const n = notes.find(n => n.id === editingNoteId);
      if (n) setSelectedNote(n);
    }
    // eslint-disable-next-line
  }, [editingNoteId, notes]);

  if (!editingNoteId && !selectedNote) {
    return (
      <div className="note-editor1 no-selection">
        <p>Select a note to edit, or click 'New' to create one.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleTagsChange = (e) => {
    setForm(f => ({
      ...f,
      tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title) return alert("Title required");
    if (editingNoteId) {
      await updateNote(editingNoteId, form);
    } else {
      await createNote(form);
    }
    setSelectedNote(null);
    onFinishEdit();
    refresh();
  };

  return (
    <div className="note-editor1">
      <form onSubmit={handleSave}>
        <div>
          <input
            className="note-title-input"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Note title"
            autoFocus
            required
          />
        </div>
        <div>
          <textarea
            className="note-content-input"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your note here..."
            rows={10}
            required
          />
        </div>
        <div>
          <input
            className="note-tags-input"
            name="tags"
            type="text"
            value={form.tags?.join(", ")}
            placeholder="Tag1, Tag2"
            onChange={handleTagsChange}
          />
          <div className="note-tags-hint">Comma-separated tags. Example: "work, ideas"</div>
        </div>
        <div style={{marginTop: 20}}>
          <button className="btn primary-btn" type="submit">
            {editingNoteId ? "Save Changes" : "Create Note"}
          </button>
          <button
            className="btn"
            style={{ marginLeft: 8 }}
            type="button"
            onClick={() => { setSelectedNote(null); onFinishEdit(); }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
