import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

import sidebarLogo from "../assets/Images/rr-logo.png";
import adminLogo from "../assets/Images/rr-logo.png";

const API_BASE = "https://rr3-1-wo2n.onrender.com";

const AdminResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/reset-password`, {
        method: "POST",
        credentials: "include", // 🔐 REQUIRED
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok && data.message.toLowerCase().includes("updated")) {
        navigate("/admin");
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
              <h1>Reset Password</h1>
            </div>

            <form onSubmit={resetPassword}>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>

              <button className="login-btn" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminResetPassword;
