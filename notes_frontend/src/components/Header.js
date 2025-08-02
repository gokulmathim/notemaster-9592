import React from "react";
import { useAuth } from "../contexts";

// PUBLIC_INTERFACE
export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="app-header1">
      <div className="app-header-title">
        <span role="img" aria-label="notes" style={{fontSize: '1.7em', marginRight: 6}}>📝</span>
        NoteMaster
      </div>
      <div className="app-header-user">
        {user && (
          <>
            <span style={{marginRight: 12}}>Hello, <b>{user.username}</b></span>
            <button className="btn accent-btn" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}
