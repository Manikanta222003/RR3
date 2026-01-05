import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

import sidebarLogo from "../assets/Images/rr-logo.png";
import adminLogo from "../assets/Images/rr-logo.png";

const AdminForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      alert(data.message);

      if (data.message.includes("OTP")) {
        navigate("/admin/verify-otp");
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <aside className="admin-left">
        <div className="brand">
          <img src={sidebarLogo} className="brand-logo" />
          <h2>RR Properties</h2>
        </div>
      </aside>

      <main className="admin-right">
        <div className="login-card">
          <div className="login-form full">
            <div className="form-header">
              <img src={adminLogo} className="admin-logo" />
              <h1>Forgot Password</h1>
              <p>OTP will be sent to registered admin email</p>
            </div>

            <form onSubmit={sendOtp}>
              <button className="login-btn" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminForgotPassword;
