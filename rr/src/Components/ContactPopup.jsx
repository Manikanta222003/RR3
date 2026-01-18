import React, { useState } from "react";
import "../styles/ContactPopup.css";

const API_BASE = "https://rr3-1-wo2n.onrender.com"; // ✅ Render backend

function ContactPopup({ isOpen, onClose }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.email || !form.phone || !form.message) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/contact/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Failed to send message");
        return;
      }

      alert("✅ Message sent successfully");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      onClose(); // ✅ close popup after success
    } catch (err) {
      console.error("CONTACT POPUP ERROR:", err);
      alert("❌ Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          ×
        </button>

        <h2>Contact Us</h2>
        <p>Fill the form and we’ll get back to you</p>

        <form onSubmit={submitForm}>
          <div className="popup-row">
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              on
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPopup;
