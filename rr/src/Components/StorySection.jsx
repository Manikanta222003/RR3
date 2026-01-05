// src/components/about/StorySection.jsx
import "./StorySection.css";

function StorySection() {
  return (
    <section className="story-section">
      <div className="story-wrapper">
        {/* LEFT: Our Story */}
        <div className="story-left">
          <h2 className="story-heading">Our Story</h2>

          <p className="story-text">
            Founded with a vision to simplify real estate, RR Properties has
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

        {/* RIGHT: Our Founder card */}
        <div className="story-right">
          <div className="founder-card">
            <div className="founder-icon-wrapper">
              <div className="founder-icon-circle">
                <span className="founder-icon">👤</span>
              </div>
            </div>

            <h3 className="founder-title">Our Founder</h3>

            <p className="founder-text">
              RR Properties is led by an experienced real estate team dedicated
              to building trust through honest advice, curated projects, and
              seamless transactions. Their vision is to make property ownership
              accessible, safe, and rewarding for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
