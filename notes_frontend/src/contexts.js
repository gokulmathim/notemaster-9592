import React, { createContext, useContext, useState, useCallback } from "react";
import * as api from "./api";

// --- AuthContext ---
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Auth context provider for user state and auth methods. */
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Wrap API setToken
  const setApiToken = (tok) => {
    api.setToken(tok);
    setToken(tok);
  };

  const login = useCallback(async ({ username, password }) => {
    const tok = await api.login({ username, password });
    setApiToken(tok);
    const me = await api.getMe();
    setUser(me);
  }, []);

  const register = useCallback(async ({ username, password }) => {
    await api.register({ username, password });
    return login({ username, password });
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
    setApiToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setApiToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- NotesContext ---
const NotesContext = createContext();
export function useNotes() {
  return useContext(NotesContext);
}

// PUBLIC_INTERFACE
export function NotesProvider({ children }) {
  /** Notes context: manages notes, tags, search/filter, and API loading. */
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  // Fetch notes from API
  const fetchNotes = useCallback(async (params = {}) => {
    setLoading(true);
    const notesData = await api.getNotes(params);
    setNotes(notesData);
    setLoading(false);
  }, []);

  // Fetch tags from API
  const fetchTags = useCallback(async () => {
    setTags(await api.getTags());
  }, []);

  // Sync notes and tags when filters change
  const refresh = useCallback(async () => {
    await fetchNotes({ search, tag: tagFilter });
    await fetchTags();
  }, [search, tagFilter, fetchNotes, fetchTags]);

  // Direct create/update/delete calls
  const createNote = async (note) => {
    await api.createNote(note);
    await refresh();
  };
  const updateNote = async (id, note) => {
    await api.updateNote(id, note);
    await refresh();
  };
  const deleteNote = async (id) => {
    await api.deleteNote(id);
    if (selectedNote && selectedNote.id === id) setSelectedNote(null);
    await refresh();
  };

  return (
    <NotesContext.Provider
      value={{
        notes, tags, loading, search, setSearch, tagFilter, setTagFilter,
        selectedNote, setSelectedNote, refresh,
        createNote, updateNote, deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
