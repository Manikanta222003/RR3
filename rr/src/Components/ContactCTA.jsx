// src/components/common/ContactCTA.jsx
import "./ContactCTA.css";

function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="contact-cta-wrapper">
        <h2 className="contact-cta-title">Ready to Find Your Property?</h2>

        <p className="contact-cta-subtitle">
          Get in touch with our expert team today
        </p>

        <div className="contact-cta-buttons">
          <a href="tel:+919502977999" className="contact-cta-btn">
            📞 Call Us
          </a>

          <a
            href="https://wa.me/919502977999"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-cta-btn"
          >
            💬 WhatsApp
          </a>

          <a
            href="mailto:info@propertiesbazar.net"
            className="contact-cta-btn"
          >
            ✉️ Email
          </a>
        </div>

        <div className="contact-cta-info">
          <p>
            <strong>Phone:</strong> +91 9502977999
          </p>
          <p>
            <strong>WhatsApp:</strong> +91 9502977999
          </p>
          <p>
            <strong>Email:</strong> rrproperties80@gmail.com
          </p>
          <p>
            <strong>Address:</strong> 2nd floor, Venkata Narayana Street, Opp. Venkateswara Swamy Temple, Gandhi Nagar, Kakinada, Andhra Pradesh 533004
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
