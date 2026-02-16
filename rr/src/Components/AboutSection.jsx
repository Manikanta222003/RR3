// src/components/about/AboutSection.jsx
import "./AboutSection.css";
import aboutImg from "../assets/Images/About1.png"; 

function AboutSection() {
  return (
    <section className="about-section">
      <h2 className="about-top-heading">
       We are a trusted, global Apartment Marketing Consultancy.
      </h2>

      <div className="about-wrapper">
        {/* Left: image */}
        <div className="about-image-wrapper">
          <img src={aboutImg} alt="Modern residential building" />
        </div>

        {/* Right: content */}
        <div className="about-content">
          <h3 className="about-title">Apartment Marketing Consultancy, Made Simple.</h3>

          <p className="about-text">
            At RR Properties we specialize in guiding buyers and investors
            through every step of the property journey. From premium apartments
            and villas to high-yield commercial spaces, our team handles
            valuation, legal checks, negotiations and closing with full
            transparency. We focus on secure transactions, clear documentation
            and long-term value so you can invest with confidence.
          </p>

          <div className="about-buttons">
            <a href="contacts">
            <button className="btn-primary">Book a Consultation</button>
            </a>
            <a href="property">
            <button className="btn-outline">View Our Services</button>
            </a>
          </div>

          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
