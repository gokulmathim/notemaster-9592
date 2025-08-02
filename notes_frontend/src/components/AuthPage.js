import React, { useState } from "react";
import { useAuth } from "../contexts";

// PUBLIC_INTERFACE
export default function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login(form);
      } else {
        await register(form);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="authpage1">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text" name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          autoFocus
          required
        />
        <input
          type="password" name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button className="btn primary-btn" type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      <div className="auth-toggle">
        {mode === "login" ? (
          <span>
            Need an account?{" "}
            <button className="text-btn" onClick={() => setMode("register")}>Register</button>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <button className="text-btn" onClick={() => setMode("login")}>Login</button>
          </span>
        )}
      </div>
      {error && <div className="auth-error">{error}</div>}
      <div className="brand-hint">NoteMaster</div>
    </div>
  );
}
