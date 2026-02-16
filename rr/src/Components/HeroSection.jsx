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

/* FIXED PRICE RANGES */
const priceRanges = [
  "0-30 Lakhs",
  "30-40 Lakhs",
  "40-50 Lakhs",
  "50-60 Lakhs",
  "60-70 Lakhs",
  "70-80 Lakhs",
  "80-90 Lakhs",
  "90 Lakhs - 1 Crore",
  "1 - 1.2 Crore",
  "1.2 - 1.4 Crore",
  "1.4 - 1.6 Crore",
  "1.6 - 1.8 Crore",
  "1.8 - 2 Crore",
];

function HeroSection() {
  const navigate = useNavigate();

  const [slides, setSlides] = useState([DEFAULT_SLIDE]);
  const [current, setCurrent] = useState(0);

  const [locations, setLocations] = useState([]);
  const [facings, setFacings] = useState([]);

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
     LOAD FILTERS
  ========================= */
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await fetch(`${API_BASE}/property/filters`);
        const data = await res.json();

        setLocations(data.locations || []);
        setFacings(data.facings || []);
      } catch (err) {
        console.log("Failed to load filters");
      }
    };

    loadFilters();
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
        src={activeSlide.image}
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
          {/* <input
            placeholder="Project Code"
            value={filters.projectCode}
            onChange={(e) =>
              setFilters({ ...filters, projectCode: e.target.value })
            }
          /> */}

          {/* LOCATION */}
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
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="4BHK">4BHK</option>
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
            <option value="Ready to Move">Ready to Move</option>
            <option value="Under Construction">Under Construction</option>
          </select>

          {/* PRICE RANGE (FIXED) */}
          <select
            value={filters.price}
            onChange={(e) =>
              setFilters({ ...filters, price: e.target.value })
            }
          >
            <option value="">Price Range</option>

            {priceRanges.map((range, index) => (
              <option key={index} value={range}>
                {range}
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
            {facings.map((face, index) => (
              <option key={index} value={face}>
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
