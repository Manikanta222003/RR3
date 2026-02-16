// src/components/common/FAQSection.jsx
import { useEffect, useState } from "react";
import "./FAQSection.css";

function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch FAQs from backend
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
            const res = await fetch("https://rr3-1-wo2n.onrender.com/faq", {
          credentials: "include",
        });

        const data = await res.json();
        setFaqs(data);
      } catch (err) {
        console.error("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <div className="faq-wrapper">
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        <p className="faq-subtitle">
          Find Answers to Common Questions About Our Property Services.
        </p>

        {/* Loading */}
        {loading && <p>Loading FAQs...</p>}

        {/* No FAQs */}
        {!loading && faqs.length === 0 && (
          <p>No FAQs available at the moment.</p>
        )}

        {/* FAQ List */}
        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item._id || index}
                className={`faq-item ${isOpen ? "open" : ""}`}
              >
                <button
                  className="faq-question-row"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">
                    {item.question}
                  </span>

                  <span className="faq-toggle-circle">
                    <span className="faq-toggle-icon">
                      {isOpen ? "−" : "+"}
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
