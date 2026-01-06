import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

const API_BASE = "https://rr3-1-wo2n.onrender.com";

function AdminBanner() {
  const [file, setFile] = useState(null);
  const [banners, setBanners] = useState([]);
  const [uploading, setUploading] = useState(false);

  /* =========================
     LOAD BANNERS
  ========================= */
  const loadBanners = async () => {
    try {
      const res = await fetch(`${API_BASE}/banner`, {
        credentials: "include", // safe even if public
      });
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : data.banners || []);
    } catch (err) {
      console.error("Failed to load banners", err);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  /* =========================
     UPLOAD BANNER
  ========================= */
  const uploadBanner = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    if (uploading) return;
    setUploading(true);

    try {
      /* 1️⃣ Upload image */
      const fd = new FormData();
      fd.append("image", file);

      const uploadRes = await fetch(`${API_BASE}/upload/image`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      if (!uploadRes.ok) throw new Error("Image upload failed");

      const uploadData = await uploadRes.json();

      /* 2️⃣ Save banner */
      const saveRes = await fetch(`${API_BASE}/banner/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: uploadData.imageUrl }),
      });

      if (!saveRes.ok) throw new Error("Banner save failed");

      alert("Banner uploaded successfully");
      setFile(null);
      loadBanners();
    } catch (err) {
      console.error(err);
      alert("Failed to upload banner");
    } finally {
      setUploading(false);
    }
  };

  /* =========================
     DELETE BANNER
  ========================= */
  const deleteBanner = async (id) => {
    if (!window.confirm("Delete this banner?")) return;

    try {
      const res = await fetch(`${API_BASE}/banner/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      alert(data.message || "Banner deleted");
      loadBanners();
    } catch (err) {
      console.error(err);
      alert("Failed to delete banner");
    }
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h2>Manage Banners</h2>
      </div>

      {/* UPLOAD SECTION */}
      <div className="card upload-card">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="add-btn"
          onClick={uploadBanner}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* BANNER GRID */}
      <div className="banner-grid">
        {banners.length === 0 ? (
          <p>No banners uploaded yet</p>
        ) : (
          banners.map((b) => (
            <div className="banner-card" key={b._id}>
              <img src={b.imageUrl} alt="banner" />
              <button
                className="delete-btn"
                onClick={() => deleteBanner(b._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminBanner;
