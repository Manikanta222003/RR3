import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function AdminFaq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load FAQs
  const loadFaqs = async () => {
    const res = await fetch(
    "https://rr3-1-wo2n.onrender.com/faq",
    { credentials: "include" }
  );
    const data = await res.json();
    setFaqs(data);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  // Add FAQ
  const addFaq = async () => {
    if (!question || !answer) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const res = await fetch(
    "https://rr3-1-wo2n.onrender.com/faq/add",
    {
      method: "POST",
      credentials: "include", // 🔐 REQUIRED
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer }),
    }
  );

    const data = await res.json();

    if (res.ok) {
      alert("FAQ added");
      setQuestion("");
      setAnswer("");
      loadFaqs();
    } else {
      alert(data.message || "Failed");
    }

    setLoading(false);
  };

  // Delete FAQ
  const deleteFaq = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;

     const res = await fetch(
    `https://rr3-1-wo2n.onrender.com/faq/delete/${id}`,
    {
      method: "DELETE",
      credentials: "include", // 🔐 REQUIRED
    }
  );

    const data = await res.json();
    alert(data.message);
    loadFaqs();
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h2>Manage FAQs</h2>
      </div>

      {/* Add FAQ */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3>Add FAQ</h3>

        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows="4"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          className="add-btn"
          onClick={addFaq}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add FAQ"}
        </button>
      </div>

      {/* FAQ List */}
      <div className="card">
        <h3>FAQ List</h3>

        {faqs.length === 0 ? (
          <p>No FAQs added yet</p>
        ) : (
          faqs.map((faq, index) => (
            <div
              key={faq._id}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              <b>{index + 1}. {faq.question}</b>
              <p>{faq.answer}</p>

              <button
                className="delete-btn"
                onClick={() => deleteFaq(faq._id)}
                style={{ width: "120px" }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminFaq;
