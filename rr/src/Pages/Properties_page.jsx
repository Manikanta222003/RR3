import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/Properties_page.css";
import logo from "../assets/Images/rr-logo.png";

const API_BASE = "https://rr3-1-wo2n.onrender.com";
const FALLBACK_IMG = "/fallback.jpg";

function Properties_page() {
  const routerLocation = useLocation();

  const [properties, setProperties] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    projectCode: "",
    location: "",
    flatType: "",
    constructionStatus: "",
    price: "",
    facing: "",
  });

  const [locations, setLocations] = useState([]);
  const [prices, setPrices] = useState([]);
  const [facings, setFacings] = useState([]);

  const [currentBanner, setCurrentBanner] = useState(0);
  const [cardImageIndex, setCardImageIndex] = useState({});

  /* =========================
     LOAD FILTER OPTIONS
  ========================= */
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await fetch(`${API_BASE}/property/filters`);
        const data = await res.json();

        setLocations(data.locations || []);
        setPrices(data.prices || []);
        setFacings(data.facings || []);
      } catch (err) {
        console.error("Failed to load filters");
      }
    };

    loadFilters();
  }, []);

  /* =========================
     APPLY FILTERS FROM HERO
  ========================= */
  useEffect(() => {
    if (routerLocation.state) {
      setFilters((prev) => ({
        ...prev,
        ...routerLocation.state,
      }));
    }
  }, [routerLocation.state]);

  /* =========================
     FETCH PROPERTIES (BACKEND FILTER)
  ========================= */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const query = new URLSearchParams(filters).toString();

        const res = await fetch(
          `${API_BASE}/property?${query}`
        );

        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch properties");
      }
    };

    fetchProperties();
  }, [filters]);

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
     CARD IMAGE SLIDER
  ========================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setCardImageIndex((prev) => {
        const updated = { ...prev };

        properties.forEach((p) => {
          if (p.images && p.images.length > 1) {
            const current = prev[p._id] || 0;
            updated[p._id] =
              current === p.images.length - 1 ? 0 : current + 1;
          }
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [properties]);

  const getCardImage = (property) => {
    if (!property.images || property.images.length === 0)
      return FALLBACK_IMG;

    const index = cardImageIndex[property._id] || 0;
    return property.images[index]?.url || FALLBACK_IMG;
  };

  return (
    <section className="property-section">

      {/* ================= TOP BANNER ================= */}
      <div className="property-banner">
        {bannerImages.length > 0 && (
          <img src={bannerImages[currentBanner]} alt="Banner" />
        )}
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="filter-bar">
        <h3>All Projects</h3>

        <input
          placeholder="Search"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <input
          placeholder="Project Code"
          value={filters.projectCode}
          onChange={(e) =>
            setFilters({ ...filters, projectCode: e.target.value })
          }
        />

        <select
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
        >
          <option value="">Location</option>
          {locations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={filters.flatType}
          onChange={(e) =>
            setFilters({ ...filters, flatType: e.target.value })
          }
        >
          <option value="">Flat Type</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="4BHK">4BHK</option>
        </select>

        <select
          value={filters.constructionStatus}
          onChange={(e) =>
            setFilters({
              ...filters,
              constructionStatus: e.target.value,
            })
          }
        >
          <option value="">Status</option>
          <option value="Ready to Move">Ready to Move</option>
          <option value="Under Construction">
            Under Construction
          </option>
        </select>

        <select
          value={filters.price}
          onChange={(e) =>
            setFilters({ ...filters, price: e.target.value })
          }
        >
          <option value="">Price</option>
          {prices.map((price, i) => (
            <option key={i} value={price}>
              {price}
            </option>
          ))}
        </select>

        <select
          value={filters.facing}
          onChange={(e) =>
            setFilters({ ...filters, facing: e.target.value })
          }
        >
          <option value="">Facing</option>
          {facings.map((face, i) => (
            <option key={i} value={face}>
              {face}
            </option>
          ))}
        </select>

        <button
          className="clear-btn"
          onClick={() =>
            setFilters({
              search: "",
              projectCode: "",
              location: "",
              flatType: "",
              constructionStatus: "",
              price: "",
              facing: "",
            })
          }
        >
          CLEAR
        </button>
      </div>

      {/* ================= PROPERTY CARDS ================= */}
      <div className="property-flex">
        {properties.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No properties found.
          </p>
        ) : (
          properties.map((item) => (
            <div className="property-card" key={item._id}>
              <div className="property-image">
                <img src={getCardImage(item)} alt={item.title} />
                <div className="property-logo">
                  <img src={logo} alt="Logo" />
                </div>
              </div>

              <div className="property-content">
                <h3>{item.title}</h3>
                <p>📍 {item.location}</p>
                <p><strong>Flat Type:</strong> {item.flatType}</p>
                <p><strong>Price:</strong> {item.price}</p>

                <Link to="/contacts">
                  <button className="property-btn">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Properties_page;
