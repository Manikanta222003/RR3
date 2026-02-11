import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import bgImage1 from "../assets/Images/for-pc.jpeg";

const API_BASE = "https://rr3-1-wo2n.onrender.com";

/* DEFAULT SLIDE */
const DEFAULT_SLIDE = {
  id: "default",
  image: bgImage1,
  titleLine1: "From Dreams to Reality",
  description:
    "We provide a complete service for the sale, purchase or rental of real estate.",
  ctaText: "Apply",
};

const TYPOLOGY_OPTIONS = ["2BHK", "3BHK", "4BHK"];
const STATUS_OPTIONS = ["Ready to Move", "Under Construction"];
const FACING_OPTIONS = ["North", "South", "East", "West"];

function HeroSection() {
  const navigate = useNavigate();

  const [slides, setSlides] = useState([DEFAULT_SLIDE]);
  const [current, setCurrent] = useState(0);

  const [locations, setLocations] = useState([]);
  const [prices, setPrices] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    projectCode: "",
    location: "",
    flatType: "",
    constructionStatus: "",
    price: "",
    facing: "",
  });

  /* =========================
     LOAD BANNERS
  ========================= */
  useEffect(() => {
    const loadBanners = async () => {
      try {
        const res = await fetch(`${API_BASE}/banner`);
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const backendSlides = data
            .filter((b) => b.imageUrl)
            .map((b) => ({
              id: b._id,
              image: b.imageUrl,
              titleLine1: DEFAULT_SLIDE.titleLine1,
              description: DEFAULT_SLIDE.description,
              ctaText: DEFAULT_SLIDE.ctaText,
            }));

          setSlides([DEFAULT_SLIDE, ...backendSlides]);
        }
      } catch (err) {
        console.log("Failed to load banners");
      }
    };

    loadBanners();
  }, []);

  /* =========================
     LOAD LOCATIONS (Dynamic)
  ========================= */
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const res = await fetch(`${API_BASE}/locations`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setLocations(data);
        }
      } catch (err) {
        console.log("Failed to load locations");
      }
    };

    loadLocations();
  }, []);

  /* =========================
     LOAD PRICES (Dynamic)
  ========================= */
  useEffect(() => {
    const loadPrices = async () => {
      try {
        const res = await fetch(`${API_BASE}/prices`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setPrices(data);
        }
      } catch (err) {
        console.log("Failed to load prices");
      }
    };

    loadPrices();
  }, []);

  /* =========================
     AUTO SLIDE
  ========================= */
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [slides]);

  /* =========================
     APPLY FILTERS
  ========================= */
  const applyFilters = () => {
    navigate("/property", { state: filters });
  };

  const activeSlide = slides[current] || DEFAULT_SLIDE;

  return (
    <section className="hero">
      {/* Background Image */}
      <img
        src={activeSlide.image || bgImage1}
        alt="Hero Banner"
        className="hero-bg"
      />

      <div className="hero-content">
        <h1>{activeSlide.titleLine1}</h1>
        <p>{activeSlide.description}</p>

        {/* FILTER BAR */}
        <div className="hero-filter-bar">

          {/* SEARCH */}
          <input
            placeholder="Search project or location"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />

          {/* PROJECT CODE */}
          <input
            placeholder="Project Code"
            value={filters.projectCode}
            onChange={(e) =>
              setFilters({ ...filters, projectCode: e.target.value })
            }
          />

          {/* LOCATION (Dynamic) */}
          <select
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          >
            <option value="">Location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* FLAT TYPE */}
          <select
            value={filters.flatType}
            onChange={(e) =>
              setFilters({ ...filters, flatType: e.target.value })
            }
          >
            <option value="">Flat Type</option>
            {TYPOLOGY_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* STATUS */}
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
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* PRICE (Dynamic) */}
          <select
            value={filters.price}
            onChange={(e) =>
              setFilters({ ...filters, price: e.target.value })
            }
          >
            <option value="">Price</option>
            {prices.map((price, index) => (
              <option key={index} value={price}>
                {price}
              </option>
            ))}
          </select>

          {/* FACING */}
          <select
            value={filters.facing}
            onChange={(e) =>
              setFilters({ ...filters, facing: e.target.value })
            }
          >
            <option value="">Facing</option>
            {FACING_OPTIONS.map((face) => (
              <option key={face} value={face}>
                {face}
              </option>
            ))}
          </select>

          {/* APPLY BUTTON */}
          <button className="hero-btn" onClick={applyFilters}>
            Apply
          </button>

        </div>
      </div>

      {/* SLIDER DOTS */}
      {slides.length > 1 && (
        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot ${
                index === current ? "active" : ""
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroSection;
