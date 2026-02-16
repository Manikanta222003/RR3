// src/components/about/StorySection.jsx
import "./StorySection.css";

function StorySection() {
  return (
    <section className="story-section">
      <div className="story-wrapper">
        {/* LEFT: Our Story */}
        <div className="story-left">
          <h2 className="story-heading">Our Journey</h2>

          <p className="story-text">
            Founded with a vision to simplify Apartment Marketing Consultancy, RR Properties has
            been helping families and investors find the right property with
            confidence. Our focus on transparency, market knowledge, and
            long-term value sets us apart.
          </p>

          <p className="story-text">
            With years of experience in residential, commercial, and investment
            properties, we provide tailored solutions that match your goals.
            From first-time home buyers to seasoned investors, we guide you
            through every step of the process.
          </p>
          <a href="aboutus">
          <button className="story-btn">Read More About Us</button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
