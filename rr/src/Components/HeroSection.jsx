import { useEffect, useState } from "react";
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
  ctaText: "See Our Developments",
};

function HeroSection() {
  const [slides, setSlides] = useState([DEFAULT_SLIDE]);
  const [current, setCurrent] = useState(0);

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
              image: b.imageUrl, // ✅ Cloudinary URL (absolute)
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
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [slides]);

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

        <a href="/property">
          <button className="hero-btn">
            {activeSlide.ctaText}
          </button>
        </a>
      </div>

      {/* Slider Dots */}
      {slides.length > 1 && (
        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot ${
                index === current ? "active" : ""
              }`}
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
