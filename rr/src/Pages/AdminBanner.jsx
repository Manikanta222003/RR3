import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function AdminBanner() {
  const [file, setFile] = useState(null);
  const [banners, setBanners] = useState([]);

  // Load banners
  const loadBanners = async () => {
    const res = await fetch("http://localhost:5000/banner");
    const data = await res.json();
    setBanners(data);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  // Upload banner
  const uploadBanner = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const fd = new FormData();
    fd.append("image", file);

    const uploadRes = await fetch(
      "http://localhost:5000/upload/image",
      {
        method: "POST",
        credentials: "include",
        body: fd,
      }
    );

    const uploadData = await uploadRes.json();

    await fetch("http://localhost:5000/banner/add", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: uploadData.imageUrl }),
    });

    alert("Banner uploaded successfully");
    setFile(null);
    loadBanners();
  };

  // ✅ DELETE BANNER
  const deleteBanner = async (id) => {
    if (!window.confirm("Delete this banner?")) return;

    const res = await fetch(
      `http://localhost:5000/banner/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await res.json();
    alert(data.message);
    loadBanners();
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h2>Manage Banners</h2>
      </div>

      {/* Upload Section */}
      <div className="card upload-card">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="add-btn" onClick={uploadBanner}>
          Upload
        </button>
      </div>

      {/* Banner Grid */}
      <div className="banner-grid">
        {banners.map((b) => (
          <div className="banner-card" key={b._id}>
            <img src={b.imageUrl} alt="banner" />
            <button
              className="delete-btn"
              onClick={() => deleteBanner(b._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminBanner;
