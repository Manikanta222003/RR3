import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/Properties_page.css";
import logo from "../assets/Images/rr-logo.png";

const API_BASE = "https://rr3-1-wo2n.onrender.com"; // ✅ Render backend
const FALLBACK_IMG = "/fallback.jpg";

const FACING_OPTIONS = ["North", "East", "South", "West"];
const TYPOLOGY_OPTIONS = ["2BHK", "3BHK", "4BHK"];
const STATUS_OPTIONS = ["Ready to Move", "Under Construction"];

function Properties_page() {
  const location = useLocation();

  const [properties, setProperties] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  /* ✅ per-card image index */
  const [cardImageIndex, setCardImageIndex] = useState({});

  /* =========================
     FILTER STATE
  ========================= */
  const [filters, setFilters] = useState({
    search: "",
    projectCode: "",
    flatType: "",
    constructionStatus: "",
    facing: [],
  });

  /* ✅ APPLY FILTERS FROM HOME HERO (AUTO) */
  useEffect(() => {
    if (location.state) {
      setFilters((prev) => ({
        ...prev,
        ...location.state,
      }));
    }
  }, [location.state]);

  /* =========================
     LOAD PROPERTIES
  ========================= */
  useEffect(() => {
    fetch(`${API_BASE}/property`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(Array.isArray(data) ? data : []);
      })
      .catch(console.error);
  }, []);

  /* =========================
     BANNER IMAGES
  ========================= */
  const bannerImages = [
    ...new Set(
      properties.flatMap((p) =>
        p.images?.filter((img) => img.isPropertyBanner).map((img) => img.url)
      )
    ),
  ];

  /* =========================
     TOP BANNER AUTO SLIDER
  ========================= */
  useEffect(() => {
    if (bannerImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentBanner((prev) =>
        prev === bannerImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [bannerImages]);

  /* =========================
     PROPERTY CARD IMAGE SLIDER
  ========================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setCardImageIndex((prev) => {
        const updated = { ...prev };

        properties.forEach((p) => {
          if (p.images && p.images.length > 1) {
            const current = prev[p._id] || 0;
            updated[p._id] = current === p.images.length - 1 ? 0 : current + 1;
          }
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [properties]);

  const toggleFacing = (face) => {
    setFilters((prev) => ({
      ...prev,
      facing: prev.facing.includes(face)
        ? prev.facing.filter((f) => f !== face)
        : [...prev.facing, face],
    }));
  };

  /* =========================
     FILTER LOGIC
  ========================= */
  const filteredProperties = properties.filter((p) => {
    return (
      (filters.search === "" ||
        p.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.location?.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.projectCode === "" || p.projectCode === filters.projectCode) &&
      (filters.flatType === "" || p.flatType === filters.flatType) &&
      (filters.constructionStatus === "" ||
        p.constructionStatus === filters.constructionStatus) &&
      (filters.facing.length === 0 ||
        filters.facing.some((f) => p.facing?.includes(f)))
    );
  });

  /* =========================
     CARD IMAGE HELPER
  ========================= */
  const getCardImage = (property) => {
    if (!property.images || property.images.length === 0) return FALLBACK_IMG;

    const index = cardImageIndex[property._id] || 0;
    return property.images[index]?.url || FALLBACK_IMG;
  };

  return (
    <section className="property-section">
      {/* ================= TOP BANNER ================= */}
      <div className="property-banner">
        {bannerImages.length > 0 && (
          <img src={bannerImages[currentBanner]} alt="Property Banner" />
        )}
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="filter-bar">
        <h3>All Projects</h3>

        <input
          placeholder="Search project or location"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <input
          placeholder="Project Code"
          value={filters.projectCode}
          onChange={(e) =>
            setFilters({ ...filters, projectCode: e.target.value })
          }
        />

        <select
          value={filters.flatType}
          onChange={(e) => setFilters({ ...filters, flatType: e.target.value })}
        >
          <option value="">Flat Type</option>
          {TYPOLOGY_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={filters.constructionStatus}
          onChange={(e) =>
            setFilters({ ...filters, constructionStatus: e.target.value })
          }
        >
          <option value="">Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="facing-filter">
          {FACING_OPTIONS.map((f) => (
            <label key={f}>
              <input
                type="checkbox"
                checked={filters.facing.includes(f)}
                onChange={() => toggleFacing(f)}
              />{" "}
              {f}
            </label>
          ))}
        </div>

        <button
          className="clear-btn"
          onClick={() =>
            setFilters({
              search: "",
              projectCode: "",
              flatType: "",
              constructionStatus: "",
              facing: [],
            })
          }
        >
          CLEAR
        </button>
      </div>

      {/* ================= PROPERTY CARDS ================= */}
      <div className="property-flex">
        {filteredProperties.map((item) => (
          <div className="property-card" key={item._id}>
            <div className="property-image">
              <img src={getCardImage(item)} alt={item.title} />

              {/* ✅ STATUS TAG ON IMAGE */}
              {item.constructionStatus && (
                <div className="property-status-tag">
                  {item.constructionStatus}
                </div>
              )}

              <div className="property-logo">
                <img src={logo} alt="Logo" />
              </div>
            </div>

            <div className="property-content">
              <h3>{item.title}</h3>
              <p>📍 {item.location}</p>

              {item.flatType && (
                <p>
                  <strong>Flat Type:</strong> {item.flatType}
                </p>
              )}

              {item.projectCode && (
                <p>
                  <strong>Project Code:</strong> {item.projectCode}
                </p>
              )}

              {item.facing?.length > 0 && (
                <p>
                  <strong>Facing:</strong> {item.facing.join(", ")}
                </p>
              )}

              <p>
                <strong>Unit Size:</strong> {item.unitSize || "N/A"}
              </p>

              <p>
                <strong>Price:</strong> {item.price || "N/A"}
              </p>

              {item.remarks && (
                <p className="property-remarks">
                  <strong>Remarks:</strong> {item.remarks}
                </p>
              )}

              {/* ✅ React Router navigation */}
              <Link to="/contacts">
                <button className="property-btn">Contact Us</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Properties_page;
