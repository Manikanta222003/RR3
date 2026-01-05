import { useEffect, useState } from "react";
import "./HeroSection.css";
import bgImage1 from "../assets/Images/image 7.png"; // default image

// 🔒 DEFAULT SLIDE (INSTANT RENDER)
const DEFAULT_SLIDE = {
  id: "default",
  image: bgImage1,
  titleLine1: "From Dreams to Reality",
  description:
    "We provide a complete service for the sale, purchase or rental of real estate.",
  ctaText: "See Our Developments",
};

function HeroSection() {
  // ✅ Start with default slide (NO WAITING)
  const [slides, setSlides] = useState([DEFAULT_SLIDE]);
  const [current, setCurrent] = useState(0);

  // 🔄 LOAD BACKEND BANNERS IN BACKGROUND
  useEffect(() => {
    fetch("http://localhost:5000/banner")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const backendSlides = data.map((item) => ({
            id: item._id,
            image: item.imageUrl,
            titleLine1: DEFAULT_SLIDE.titleLine1,
            description: DEFAULT_SLIDE.description,
            ctaText: DEFAULT_SLIDE.ctaText,
          }));

          // ✅ Merge default + backend (no UI flicker)
          setSlides([DEFAULT_SLIDE, ...backendSlides]);
        }
      })
      .catch(() => {
        // silently ignore backend failure
      });
  }, []);

  // 🔁 AUTO SLIDE
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides]);

  const activeSlide = slides[current];

  return (
    <section className="hero">
      {/* Background image */}
      <img src={activeSlide.image} alt="" className="hero-bg" />

      <div className="hero-content">
        <h1>{activeSlide.titleLine1}</h1>
        <p>{activeSlide.description}</p>
        <a href="property">
        <button className="hero-btn">{activeSlide.ctaText}</button>
        </a>
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroSection;
