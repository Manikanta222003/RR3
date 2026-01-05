import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBanner from "./pages/AdminBanner";

function Home() {
  return (
    <Routes>
      {/* Home Page */}
    

      {/* Admin Pages */}
      <Route path="/admin" element={<AdminAuth />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/banner" element={<AdminBanner />} />
    </Routes>
  );
}

export default Home;
