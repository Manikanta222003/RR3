
import React from "react";
import "./AboutPage.css";
import local from "../assets/Images/local_expertise1.jpeg";
import per from "../assets/Images/Personalised_service.jpeg";

const AboutUs = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>About Us</h1>
          <p>RR Properties – Kakinada's Trusted Apartment Marketing Consultancy</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
  <div className="mission-text">
    <h2 className="mission-title">Our Mission</h2>
    <span className="mission-line"></span>

    <p>
      At <strong>RR Properties</strong>, we aim to provide exceptional Apartment Marketing Consultancy
      services in Kakinada. Our mission is to help you find your dream home or
      the perfect investment property with trust and transparency.
    </p>
  </div>

  <div className="mission-image">
    <img
      src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
      alt="Mission"
    />
    <span className="image-caption">Building Dreams in Kakinada</span>
  </div>
</section>


      {/* Why Choose Us */}
      <section className="why">
        <h2>Why Choose Us?</h2>

        <div className="why-cards">
          <div className="card">
            <img
              src={local}
              alt="Local expertise"
            />
            <h3>Local Expertise</h3>
            <p>Deep knowledge of Kakinada real estate market</p>
          </div>

          <div className="card">
            <img
              src={per}
              alt="Personalized service"
            />
            <h3>Personalized Service</h3>
            <p>Tailored solutions for every client</p>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              alt="Trusted by clients"
            />
            <h3>Trusted by Clients</h3>
            <p>Hundreds of satisfied buyers</p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements">
        <div className="stats">
           <div>
            <h3>10+</h3>
            <p>Years Experience</p>
          </div>
          <div>
            <h3>20+</h3>
            <p>Projects Delivered</p>
          </div>
          <div>
            <h3>100+</h3>
            <p>Happy Customers</p>
          </div>
          
          <div>
            <h3>100%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="team">
        <h2>Meet Our Team</h2>

        <div className="team-cards">
          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Santosh Kumar"
            />
            <h4>Santosh Kumar</h4>
            <p>Founder & CEO</p>
          </div>

          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Ananya Rao"
            />
            <h4>Ananya Rao</h4>
            <p>Sales Manager</p>
          </div>

          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/men/54.jpg"
              alt="Arvind Reddy"
            />
            <h4>Arvind Reddy</h4>
            <p>Property Consultant</p>
          </div>

          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Priya Sharma"
            />
            <h4>Priya Sharma</h4>
            <p>Client Relations</p>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="cta">
        <h2>Find Your Dream Home Today!</h2>
        <p>Ready to Start Your Property Journey in Kakinada?</p>
        <a href="contacts">
        <button>Contact Us</button>
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
