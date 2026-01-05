import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import "../styles/admin.css";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  // 🔐 Admin auth check (COMMON for all admin pages)
  useEffect(() => {
    fetch("http://localhost:5000/admin/check-auth", {
      credentials: "include",
    }).then((res) => {
      if (res.status === 401) {
        navigate("/admin");
      }
    });
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        {/* <Topbar /> */}
        {children}   {/* 👈 page content comes here */}
      </div>
    </div>
  );
}

export default AdminLayout;
