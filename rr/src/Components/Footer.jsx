// src/components/layout/Footer.jsx
import "./Footer.css";
import logo from "../assets/Images/rr-logo.png";

function Footer() {
  return (
    <footer className="footer">
      {/* Top section */}
      <div className="footer-top">

        {/* Column 1 - Logo */}
        <div className="footer-column footer-logo-col">
          <a href="/">
          <img src={logo} alt="RR Properties" className="footer-logo" />
          </a>
        </div>

        {/* Column 2 - Address */}
        <div className="footer-column footer-address">
          <h4 className="footer-heading">Our Address</h4>
          <p>
            2nd floor, Venkata Narayana Street,
            <br />
            Opp. Venkateswara Swamy Temple,
            <br />
            Gandhi Nagar, Kakinada,
            <br />
            Andhra Pradesh 533004
          </p>
        </div>

        {/* Column 3 - Quick Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {/* <a href="https://rrproperties.co.in/"><li>Website</li></a> */}
              <a href="https://www.instagram.com/rr.properties_?igsh=MWJwcXQxdW1kazUycA=="><li>Instagram</li></a>
              <a href="https://www.facebook.com/rrpropertieskakinada?mibextid=ZbWKwL"><li>Facebook</li></a>
              <a href="https://youtube.com/@rrpropertieskakinada?si=8KVLpi99flerWjB4"><li>Youtube</li></a>
            </ul>
          </div>

          {/* Column 4 - Map */}
        <div className="footer-column footer-map">
          <h4 className="footer-heading">Find Us</h4>
          <div className="map-container">
              <iframe
          title="RR Properties Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122114.41669992766!2d82.08114594335939!3d16.970835100000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a382940eb548595%3A0x65379db3943f816e!2sRR%20PROPERTIES!5e0!3m2!1sen!2sin!4v1767365594862!5m2!1sen!2sin"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

          </div>
        </div>

      </div>

      <hr className="footer-divider" />

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">
          ©2025 RR Properties. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
