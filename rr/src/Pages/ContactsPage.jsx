import React, { useState } from "react";
import "../styles/ContactsPage.css";

const ContactPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    alert("Message sent successfully");

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
      </section>

      {/* CONTENT */}
      <section className="contact-container">
        <div className="contact-box">
          {/* LEFT FORM */}
          <div className="contact-form">
            <h2>Have a question?</h2>
            <p>Please fill the form and our team will reach you.</p>

            <form onSubmit={submitForm}>
              <div className="row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                rows="4"
                placeholder="Your message"
                value={form.message}
                onChange={handleChange}
                required
              />

              <button type="submit">Send Message</button>
            </form>
          </div>

          {/* RIGHT INFO */}
          <div className="contact-info">
            <h3>Get in touch</h3>

            <div className="info-item">
              <strong>Address</strong>
              <p>
                2nd floor, Venkata Narayana Street <br />
                Pratap Nagar, Kakinada <br />
                Andhra Pradesh 533004
              </p>
            </div>

            <div className="info-item">
              <strong>Phone</strong>
              <p>+91 9502977999</p>
            </div>

            <div className="info-item">
              <strong>Email</strong>
              <p>rrproperties80@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
