import React, { useEffect, useState } from "react";
import "./App.css";
import { AuthProvider, useAuth, NotesProvider } from "./contexts";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import AuthPage from "./components/AuthPage";

// PUBLIC_INTERFACE
function MainApp() {
  const { user } = useAuth();
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Theme logic
  const [theme] = useState('light'); // always light due to requirements
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (!user) {
    return (
      <div className="main-container">
        <div className="centered-auth">
          <AuthPage />
        </div>
      </div>
    );
  }

  return (
    <NotesProvider>
      <div className="main-container">
        <Header />
        <div className="layout-wrap">
          <Sidebar />
          <main className="main-content">
            <NotesList
              onEditNote={setEditingNoteId}
            />
            <NoteEditor
              key={editingNoteId || "new"}
              editingNoteId={editingNoteId}
              onFinishEdit={() => setEditingNoteId(null)}
            />
          </main>
        </div>
      </div>
    </NotesProvider>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Top-level context for authentication
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
