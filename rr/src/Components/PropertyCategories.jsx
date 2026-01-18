// src/components/properties/PropertyCategories.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PropertyCategories.css";

/* LOGO */
import logo from "../assets/Images/rr-logo.png";

/* ✅ BACKEND */
const API_BASE = "https://rr3-1-wo2n.onrender.com";

function PropertyCategories() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔄 LOAD HOME PAGE PROPERTIES (BACKEND ONLY) */
  useEffect(() => {
    const loadHomeProperties = async () => {
      try {
        const res = await fetch(`${API_BASE}/property/home`);
        const data = await res.json();

        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load home properties", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadHomeProperties();
  }, []);

  return (
    <section className="property-section" id="services">
      <h2 className="property-heading">Explore Property Categories</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No properties available right now.
        </p>
      ) : (
        <div className="property-flex">
          {properties.map((item) => (
            <div className="property-card" key={item._id}>
              <div className="property-image">
                <img
                  src={
                    item.images?.find((i) => i.isMain)?.url ||
                    item.images?.[0]?.url
                  }
                  alt={item.title}
                />

                {/* ✅ STATUS BADGE */}
                {item.constructionStatus && (
                  <span className="new-launch-badge">
                    {item.constructionStatus}
                  </span>
                )}

                <div className="property-logo">
                  <img src={logo} alt="Project Logo" />
                </div>
              </div>

              <div className="property-content">
                <h3>{item.title}</h3>
                <p className="property-location">📍 {item.location}</p>

                {/* ✅ FLAT TYPE */}
                {item.flatType && (
                  <p>
                    <strong>Flat Type:</strong> {item.flatType}
                  </p>
                )}

                <p>
                  <strong>Unit Size:</strong> {item.unitSize || "N/A"}
                </p>

                <p className="property-price">
                  <strong>Price:</strong> {item.price || "N/A"}
                </p>

                <Link to="/contacts">
                  <button className="property-btn">Contact Us</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PropertyCategories;
