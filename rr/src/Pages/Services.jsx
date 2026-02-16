import React from "react";
import "./Services.css";

const services = [
  {
    icon: "🏠",
    title: "Verified Property Options",
    desc: "Access carefully curated and verified residential and commercial properties that meet your specific requirements.",
  },
  {
    icon: "🤝",
    title: "Personalized Shortlists",
    desc: "Receive customized property recommendations based on your preferences, budget, and lifestyle needs.",
  },
  {
    icon: "🏢",
    title: "Fully Guided Site Visits",
    desc: "Expert-led property tours with detailed explanations of features, amenities, and neighborhood highlights.",
  },
  {
    icon: "💰",
    title: "Negotiation Support",
    desc: "Our experienced team helps you negotiate the best possible terms and price for your dream property.",
  },
  {
    icon: "📋",
    title: "Loan & Documentation Guidance",
    desc: "Complete assistance with loan applications, documentation, and all paperwork required for your purchase.",
  },
  {
    icon: "✅",
    title: "Complete Assistance Until Registration",
    desc: "Full support from property selection through legal registration and handover of your new home.",
  },
  {
    icon: "👨‍💼",
    title: "Expert Property Consultants",
    desc: "Professional advice from seasoned experts who understand market trends and property valuation.",
  },
  {
    icon: "👷",
    title: "Builders & Developers Partnership",
    desc: "Direct access to trusted builders and developers with exclusive project offerings and discounts.",
  },
  {
    icon: "📑",
    title: "Building Contracts Support",
    desc: "Expert guidance on building contracts, legal terms, and protection of your investment interests.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Initiate Discussion",
    desc: "We start by understanding your needs, budget, timeline, and preferences through a detailed consultation.",
  },
  {
    number: "2",
    title: "Check and Suggest Suitable Properties",
    desc: "Our team searches and analyzes properties that match your criteria, presenting only the best options.",
  },
  {
    number: "3",
    title: "Weekly Updates",
    desc: "Stay informed with regular updates on new listings, market insights, and progress on your search.",
  },
  {
    number: "4",
    title: "Free Support from Property Visits to Registration",
    desc: "Comprehensive assistance throughout the entire journey—site visits, negotiations, loans, and final registration.",
  },
];

export default function Services() {
  return (
    <div>
      {/* Header */}
      <header className="services-header">
        <h1>🔑 RR Properties</h1>
        <p>Turning Keys into New Beginnings</p>
      </header>

      {/* Main Container */}
      <div className="services-container">
        {/* Services Section */}
        <div className="section-title">
          <h2>Services We Offer</h2>
          <p>Comprehensive Guidance for Every Step of Your Journey.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Our Process Section */}
        <div className="process-section">
          <div className="section-title-dark">
            <h2>Our Process</h2>
          </div>

          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div className="process-step" key={index}>
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="cta-section">
          <h2>Ready to Find Your Dream Home?</h2>
          <p>
            A home is a big decision, and we walk with you through every part of
            it. Let's start your journey today!
          </p>
          <a href="mailto:contact@rrproperties.co.in" className="cta-button">
            Get in Touch
          </a>
        </div> */}
      </div>
    </div>
  );
}

