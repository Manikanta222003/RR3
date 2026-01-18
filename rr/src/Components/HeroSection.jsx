import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import bgImage1 from "../assets/Images/image 7.png";

const API_BASE = "https://rr3-1-wo2n.onrender.com";

/* 🔒 DEFAULT SLIDE */
const DEFAULT_SLIDE = {
  id: "default",
  image: bgImage1,
  titleLine1: "From Dreams to Reality",
  description:
    "We provide a complete service for the sale, purchase or rental of real estate.",
  ctaText: "Apply",
};

const FACING_OPTIONS = ["North", "East", "South", "West"];
const TYPOLOGY_OPTIONS = ["2BHK", "3BHK", "4BHK"];
const STATUS_OPTIONS = ["Ready to Move", "Under Construction"];

function HeroSection() {
  const navigate = useNavigate();

  const [slides, setSlides] = useState([DEFAULT_SLIDE]);
  const [current, setCurrent] = useState(0);

  /* ✅ SAME FILTERS AS PROPERTIES PAGE */
  const [filters, setFilters] = useState({
    search: "",
    projectCode: "",
    flatType: "",
    constructionStatus: "",
    facing: [],
  });

  /* =========================
     LOAD BANNERS (CLOUDINARY)
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
        console.log("Hero banners failed, using default");
      }
    };

    loadBanners();
  }, []);

  /* =========================
     AUTO SLIDE
  ========================= */
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [slides]);

  const toggleFacing = (face) => {
    setFilters((prev) => ({
      ...prev,
      facing: prev.facing.includes(face)
        ? prev.facing.filter((f) => f !== face)
        : [...prev.facing, face],
    }));
  };

  /* ✅ APPLY BUTTON NAVIGATION */
  const applyFilters = () => {
    navigate("/property", {
      state: filters,
    });
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

        {/* ✅ HERO FILTERS (SAME AS PROPERTIES PAGE) */}
        <div className="hero-filter-bar">
          <input
            placeholder="Search project or location"
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
            value={filters.flatType}
            onChange={(e) =>
              setFilters({ ...filters, flatType: e.target.value })
            }
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
              setFilters({
                ...filters,
                constructionStatus: e.target.value,
              })
            }
          >
            <option value="">Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div className="hero-facing">
            {FACING_OPTIONS.map((f) => (
              <label key={f}>
                <input
                  type="checkbox"
                  checked={filters.facing.includes(f)}
                  onChange={() => toggleFacing(f)}
                />
                {f}
              </label>
            ))}
          </div>

          <button className="hero-btn" onClick={applyFilters}>
            Apply
          </button>
        </div>
      </div>

      {/* Slider Dots */}
      {slides.length > 1 && (
        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroSection;
