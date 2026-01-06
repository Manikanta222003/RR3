// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

import sidebarLogo from "../assets/Images/rr-logo.png";
import adminLogo from "../assets/Images/rr-logo.png";

const MASTER_ADMIN_EMAIL = "mkedarisetti554@gmail.com"; // SAME AS BACKEND

const AdminLogin = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        username: MASTER_ADMIN_EMAIL, // ✅ ALWAYS SEND
        password: password,           // ✅ ALWAYS SEND
      };

      console.log("LOGIN PAYLOAD:", payload); // DEBUG

      const res = await fetch("https://rr3-1-wo2n.onrender.com/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message);

      if (data.message === "Login successful") {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <aside className="admin-left">
        <div className="brand">
          <img src={sidebarLogo} className="brand-logo" alt="logo" />
          <h2>RR Properties</h2>
        </div>
      </aside>

      <main className="admin-right">
        <div className="login-card">
          <div className="login-image">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="building"
            />
          </div>

          <div className="login-form">
            <div className="form-header">
              <img src={adminLogo} className="admin-logo" alt="admin" />
              <h1>Admin Login</h1>
              <p className="admin-email">{MASTER_ADMIN_EMAIL}</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>

              <button className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="forgot">
                <a href="/admin/forgot-password">Forgot password?</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
