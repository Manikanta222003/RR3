import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';


import HeroSection from './Components/HeroSection.jsx';
import AboutSection from './Components/AboutSection.jsx';
import StorySection from './Components/StorySection.jsx';
import NewsletterSection from './Components/NewsletterSection.jsx';
import FAQSection from './Components/FAQSection.jsx';
import ContactCTA from './Components/ContactCTA.jsx';
import Property from './Components/PropertyCategories.jsx';
import WhyChooseUs from './Components/WhyChooseUs.jsx';
import AboutUs from "./Pages/AboutPage.jsx";
import Contact from "./Pages/ContactsPage.jsx";
import Properties_page from "./Pages/Properties_page.jsx";

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
      <ContactCTA />
    </>
  );
}





function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* WEBSITE HOME PAGE */}
         <Route element={<WebLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/property" element={<Properties_page />} />
          <Route path="/PropertyServices" element={<Property />} />
          <Route path="/contacts" element={<Contact />} />
        </Route>



        {/* ADMIN PAGES */}
         <Route element={<AdminLayout />}>

        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/verify-otp" element={<AdminVerifyOtp />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/banner" element={<AdminBanner />} />
        <Route path="/admin/faq" element={<AdminFaq />} />
        <Route path="/properties" element={<Properties_page />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/contacts" element={<AdminContactPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
