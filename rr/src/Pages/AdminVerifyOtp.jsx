import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

import sidebarLogo from "../assets/Images/rr-logo.png";
import adminLogo from "../assets/Images/rr-logo.png";

const API_BASE = "https://rr3-1-wo2n.onrender.com";

const AdminVerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/verify-otp`, {
        method: "POST",
        credentials: "include", // 🔐 IMPORTANT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok && data.message === "OTP verified") {
        navigate("/admin/reset-password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <aside className="admin-left">
        <div className="brand">
          <img src={sidebarLogo} className="brand-logo" alt="RR Properties" />
          <h2>RR Properties</h2>
        </div>
      </aside>

      <main className="admin-right">
        <div className="login-card">
          <div className="login-form full">
            <div className="form-header">
              <img src={adminLogo} className="admin-logo" alt="Admin" />
              <h1>Verify OTP</h1>
            </div>

            <form onSubmit={verifyOtp}>
              <div className="form-group">
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <button className="login-btn" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminVerifyOtp;
