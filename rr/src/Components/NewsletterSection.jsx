// src/components/common/NewsletterSection.jsx
import "./NewsletterSection.css";
import houseImg from "../assets/Images/house.png"; // update path

function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-wrapper">
        {/* LEFT CONTENT */}
        <div className="newsletter-content">
          <h2 className="newsletter-title">Our Newsletter</h2>

          <p className="newsletter-text">
            Stay updated with the latest property launches, exclusive offers,
            market insights, and expert tips from RR Properties. Subscribe now
            and never miss an opportunity to invest smartly.
          </p>

          {/* <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button className="newsletter-btns">Get a Quote</button>
          </div> */}
        </div>

        {/* RIGHT IMAGE */}
        <div className="newsletter-image">
          <img src={houseImg} alt="Modern house" />
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
