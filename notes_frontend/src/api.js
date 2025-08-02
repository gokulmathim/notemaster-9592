//
// Backend API methods for NoteMaster frontend
//
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

let token = null;

// PUBLIC_INTERFACE
export function setToken(newToken) {
  /** Set the global token for requests (JWT or null). */
  token = newToken;
}

// PUBLIC_INTERFACE
export async function register({ username, password }) {
  /** Register a new user. */
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error(res.status === 409 ? 'Username already taken' : 'Registration failed');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function login({ username, password }) {
  /** Log in the user. Returns JWT. */
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  const json = await res.json();
  if (json && json.token) {
    setToken(json.token);
    return json.token;
  }
  throw new Error('Malformed response from login');
}

// PUBLIC_INTERFACE
export async function getMe() {
  /** Get current user info (requires auth). */
  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Not authenticated');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function getNotes({ search = '', tag = '' } = {}) {
  /** Return notes for current user, possibly filtered by search/tag. */
  let q = [];
  if (search) q.push(`search=${encodeURIComponent(search)}`);
  if (tag) q.push(`tag=${encodeURIComponent(tag)}`);
  const url = `${API_URL}/api/notes${q.length ? '?' + q.join('&') : ''}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch notes');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function getNote(id) {
  /** Get a single note by id (requires auth). */
  const res = await fetch(`${API_URL}/api/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(res.status === 404 ? 'Not found' : 'Failed to fetch note');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function createNote({ title, content, tags }) {
  /** Create a new note (requires auth). */
  const res = await fetch(`${API_URL}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title, content, tags }),
  });
  if (res.status !== 201) throw new Error('Failed to create note');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function updateNote(id, { title, content, tags }) {
  /** Update a note (requires auth). */
  const res = await fetch(`${API_URL}/api/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title, content, tags }),
  });
  if (!res.ok) throw new Error('Failed to update note');
  return await res.json();
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete a note (requires auth). */
  const res = await fetch(`${API_URL}/api/notes/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 204) throw new Error('Failed to delete note');
  return true;
}

// PUBLIC_INTERFACE
export async function getTags() {
  /** List all tags for the user (requires auth). */
  const res = await fetch(`${API_URL}/api/tags`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch tags');
  return await res.json();
}
