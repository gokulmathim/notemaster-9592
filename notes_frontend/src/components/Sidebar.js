import React from "react";
import { useNotes } from "../contexts";

// PUBLIC_INTERFACE
export default function Sidebar() {
  const {
    tags, tagFilter, setTagFilter, search, setSearch, refresh,
  } = useNotes();

  return (
    <aside className="sidebar1">
      <div className="sidebar-section">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && refresh()}
        />
        <button className="btn" style={{marginTop: 8}} onClick={refresh}>Search</button>
      </div>
      <div className="sidebar-section" style={{marginTop:32}}>
        <div className="sidebar-label">Tags</div>
        <div className="tag-list">
          <button
            className={!tagFilter ? "tag-btn selected" : "tag-btn"}
            onClick={() => { setTagFilter(""); refresh(); }}
          >
            All
          </button>
          {tags && tags.map(tag => (
            <button
              key={tag}
              className={tagFilter === tag ? "tag-btn selected" : "tag-btn"}
              onClick={() => { setTagFilter(tag); refresh(); }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
