// src/components/whychoose/WhyChooseUs.jsx
import "./WhyChooseUs.css";
import chooseImg from "../assets/Images/whychoose.jpeg";

function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="why-wrapper">
        {/* HEADER */}
        <div className="why-header">
          <h2 className="why-title">Why Choose Us</h2>
          <p className="why-subtext">
            Whether you are building a project or searching for a home, you need
            someone who listens before they speak and guides before they push.
          </p>
        </div>

        {/* IMAGE */}
        <div className="why-image">
          <img src={chooseImg} alt="Modern building" />
        </div>

        {/* BULLET POINT CONTENT */}
        <div className="why-points">
          <ul>
            <li>Premium, verified properties only</li>
            <li>Direct builder partnerships without middlemen</li>
            <li>Wide selection across Kakinada</li>
            <li>Full assistance from the first call to registration</li>
            <li>Professional documentation and loan guidance</li>
            <li>Homes and projects for every budget range</li>
            <li>Personalised recommendations based on real needs</li>
          </ul>

          <p className="why-tagline">
            <strong>We don’t sell. We guide.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
