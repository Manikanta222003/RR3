import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="page-header">
        <h2>Admin Dashboard</h2>
      </div>

      {/* <button
        className="add-btn"
        onClick={() => navigate("/admin/banner")}
      >
        Manage Banners
      </button> */}
    </AdminLayout>
  );
}

export default AdminDashboard;
