import React, { useState } from "react";

/**
 * ContactForm component – collects name, email, and message from user.
 * Handles local state for each field and is ready for integration (e.g., submit handling).
 */
// PUBLIC_INTERFACE
export default function ContactForm() {
  // Local state for form fields
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Handle input value changes generically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Dummy form submit handler (can be replaced with backend integration)
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In future: send form data to backend or email service
    // reset form for demo
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-form-container" style={{
      background: "#fff",
      borderRadius: "14px",
      boxShadow: "0 2px 12px #0002",
      border: "1px solid var(--border-color)",
      padding: "2rem 2.2rem",
      maxWidth: 480,
      margin: "32px auto"
    }}>
      <h2 style={{ marginBottom: 18, color: "var(--primary)" }}>Contact Us</h2>
      <form onSubmit={handleSubmit} autoComplete="off" style={{
        display: "flex", flexDirection: "column", gap: 15
      }}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          style={{
            padding: "8px 12px",
            fontSize: "1em",
            borderRadius: "5px",
            border: "1.3px solid var(--border-color)",
            background: "#f7f7fa"
          }}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          style={{
            padding: "8px 12px",
            fontSize: "1em",
            borderRadius: "5px",
            border: "1.3px solid var(--border-color)",
            background: "#f7f7fa"
          }}
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          rows={5}
          style={{
            padding: "9px 12px",
            fontSize: "1em",
            borderRadius: "5px",
            border: "1.3px solid var(--border-color)",
            background: "#f7f7fa"
          }}
        />
        <button
          className="btn primary-btn"
          type="submit"
          style={{ marginTop: 8, width: 130 }}
        >
          Send Message
        </button>
        {submitted && (
          <div style={{ color: "var(--primary)", marginTop: 8 }}>
            Thank you! Your message was sent.
          </div>
        )}
      </form>
    </div>
  );
}
