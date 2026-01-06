// src/components/properties/PropertyCategories.jsx
import { useEffect, useState } from "react";
import "./PropertyCategories.css";

/* 🔒 STATIC IMAGES */
import img1 from "../assets/Images/property2.png";
import img2 from "../assets/Images/property3.png";
import img3 from "../assets/Images/property4.png";
import img4 from "../assets/Images/property5.png";

/* LOGO */
import logo from "../assets/Images/rr-logo.png";

/* 🔒 STATIC PROPERTIES (ALWAYS SHOWN) */
const STATIC_PROPERTIES = [
  {
    _id: "static-home-1",
    title: "Dr.Y.V.Rao's Enclave 3 BHK Luxury Apartments",
    location: "Sri Ram Nagar, Kakinada",
    unitSize: "1911 Sq. Ft. East Facing",
    price: "Price On Request",
    status: "New Launch",
    images: [{ url: img1 }],
  },
  {
    _id: "static-home-2",
    title: "Signature Suite 3 BHK Luxury Apartments",
    location: "Mehar Nagar, Kakinada",
    unitSize: "1551 Sq. Ft. East & West Facings",
    price: "Price On Request",
    status: "New Launch",
    images: [{ url: img2 }],
  },
  {
    _id: "static-home-3",
    title: "Venkatadhri 3 BHK Luxury Apartments",
    location: "Near New DMART, Turangi",
    unitSize: "1405 Sq. Ft. North & South Facings",
    price: "Price On Request",
    status: "New Launch",
    images: [{ url: img3 }],
  },
  {
    _id: "static-home-4",
    title: "Surya's Velvet Vista 3 BHK Luxury Apartments",
    location: "Venkatanagar, Kakinada",
    unitSize: "1725 Sq. Ft. North Facing",
    price: "Price On Request",
    status: "New Launch",
    images: [{ url: img4 }],
  },
];

function PropertyCategories() {
  /* ✅ INSTANT LOAD */
  const [properties, setProperties] = useState(STATIC_PROPERTIES);

  /* 🔄 LOAD HOME PAGE PROPERTIES (BACKEND) */
  useEffect(() => {
    fetch("https://rr3-1-wo2n.onrender.com/property/home")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;

        setProperties((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));

          const safeBackend = data
            .filter((p) => !existingIds.has(p._id)) // ✅ prevent duplicates
            .map((p) => ({
              ...p,
              status: p.status || "New Launch",
              unitSize: p.unitSize || "Details on Request",
              price: p.price || "Price On Request",
              images:
                p.images && p.images.length > 0
                  ? p.images
                  : [{ url: img1 }], // fallback image
            }));

          return [...prev, ...safeBackend];
        });
      })
      .catch(() => {
        // backend down → static only (silent fail)
      });
  }, []);

  return (
    <section className="property-section" id="services">
      <h2 className="property-heading">Explore Property Categories</h2>

      <div className="property-flex">
        {properties.map((item) => (
          <div className="property-card" key={item._id}>
            <div className="property-image">
              <img src={item.images[0].url} alt={item.title} />
              <span className="new-launch-badge">
                {item.status}
              </span>

              <div className="property-logo">
                <img src={logo} alt="Project Logo" />
              </div>
            </div>

            <div className="property-content">
              <h3>{item.title}</h3>
              <p className="property-location">📍 {item.location}</p>

              <p>
                <strong>Unit Size:</strong> {item.unitSize}
              </p>

              <p className="property-price">
                <strong>Price:</strong> {item.price}
              </p>

              <a href="/contacts">
                <button className="property-btn">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PropertyCategories;
