import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";

/* WEBSITE COMPONENTS */
import HeroSection from "./Components/HeroSection.jsx";
import AboutSection from "./Components/AboutSection.jsx";
import StorySection from "./Components/StorySection.jsx";
import NewsletterSection from "./Components/NewsletterSection.jsx";
import FAQSection from "./Components/FAQSection.jsx";
import Property from "./Components/PropertyCategories.jsx";
import WhyChooseUs from "./Components/WhyChooseUs.jsx";

/* WEBSITE PAGES */
import AboutUs from "./Pages/AboutPage.jsx";
import Contact from "./Pages/ContactsPage.jsx";
import Properties_page from "./Pages/Properties_page.jsx";
import Services from "./Pages/Services.jsx";

/* CONTACT POPUP */
import ContactPopup from "./Components/ContactPopup.jsx";

/* ADMIN PAGES */
import AdminAuth from "./Pages/AdminAuth.jsx";
import AdminBanner from "./Pages/AdminBanner.jsx";
import AdminFaq from "./Pages/AdminFaq";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import AdminProperties from "./Pages/AdminProperties.jsx";
import AdminContactPage from "./Pages/AdminContactPage.jsx";
import AdminForgotPassword from "./Pages/AdminForgotPassword.jsx";
import AdminVerifyOtp from "./Pages/AdminVerifyOtp.jsx";
import AdminResetPassword from "./Pages/AdminResetPassword.jsx";

/* LAYOUTS */
import WebLayout from "./layouts/WebLayout.jsx";
import AdminLayout from "./layouts/AdminLayouts.jsx";

/* =========================
   HOME PAGE
========================= */
function HomePage() {
  return (
    <>
      <HeroSection />
      <Property />
      <AboutSection />
      <StorySection />
      <WhyChooseUs />
      <NewsletterSection />
      <FAQSection />
    </>
  );
}

/* =========================
   POPUP CONTROLLER
========================= */
function PopupController({ setContactOpen }) {
  const location = useLocation();

  useEffect(() => {
    // ❌ DO NOT show popup on admin routes
    if (location.pathname.startsWith("/admin")) return;

    // ✅ show popup on website pages AFTER refresh
    const timer = setTimeout(() => {
      setContactOpen(true);
    }, 2000); // 6 seconds

    return () => clearTimeout(timer);
  }, [location.pathname, setContactOpen]);

  return null;
}

/* =========================
   APP
========================= */
function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* 🔹 Controls WHEN popup opens */}
      <PopupController setContactOpen={setContactOpen} />

      {/* 🔹 GLOBAL CONTACT POPUP */}
      <ContactPopup
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <Routes>
        {/* ================= WEBSITE ROUTES ================= */}
        <Route element={<WebLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUs />} />
           <Route path="/services" element={<Services />} />
          <Route path="/property" element={<Properties_page />} />

          {/* Separate contact page */}
          <Route path="/contacts" element={<Contact />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminAuth />} />
          <Route
            path="/admin/forgot-password"
            element={<AdminForgotPassword />}
          />
          <Route path="/admin/verify-otp" element={<AdminVerifyOtp />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/banner" element={<AdminBanner />} />
          <Route path="/admin/faq" element={<AdminFaq />} />
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route path="/admin/contacts" element={<AdminContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
