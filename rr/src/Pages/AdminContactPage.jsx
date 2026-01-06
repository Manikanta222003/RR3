import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/AdminContacts.css";

function AdminContactPage() {
  const [contacts, setContacts] = useState([]);

  // 🔹 LOAD CONTACT MESSAGES
  const loadContacts = async () => {
    try {
      const res = await fetch(" https://rr3-1-wo2n.onrender.com/contact", {
        credentials: "include", // admin auth cookie
      });
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Failed to load contact messages");
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // 🔹 DELETE MESSAGE
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await fetch(`http://localhost:5000/contact/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      loadContacts();
    } catch (err) {
      alert("Failed to delete message");
    }
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h2>Contact Messages</h2>
      </div>

      {contacts.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        <div className="admin-contact-list">
          {contacts.map((c) => (
            <div className="admin-contact-card" key={c._id}>
              <p>
                <strong>Name:</strong> {c.firstName} {c.lastName}
              </p>
              <p>
                <strong>Email:</strong> {c.email}
              </p>
              <p>
                <strong>Phone:</strong> {c.phone}
              </p>
              <p>
                <strong>Message:</strong> {c.message}
              </p>
              <p className="contact-date">
                {new Date(c.createdAt).toLocaleString()}
              </p>

              <button
                className="delete-btn"
                onClick={() => deleteContact(c._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
export default AdminContactPage;
