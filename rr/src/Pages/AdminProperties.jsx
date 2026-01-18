import { useEffect, useRef, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/AdminProperties.css";

const API_BASE = "https://rr3-1-wo2n.onrender.com"; // ✅ Render backend

const FACING_OPTIONS = ["North", "East", "South", "West"];
const TYPOLOGY_OPTIONS = ["2BHK", "3BHK", "4BHK"];
const STATUS_OPTIONS = ["Ready to Move", "Under Construction"];

function AdminProperties() {
  const fileInputRef = useRef(null);

  /* =========================
     FORM STATE
  ========================= */
  const [form, setForm] = useState({
    title: "",
    projectCode: "",
    location: "",
    typology: "",
    status: "",
    unitSize: "",
    price: "",
    uds: "",
    remarks: "",
    facing: [],
    showOnHome: false,
  });

  /* =========================
     IMAGE STATE
  ========================= */
  const [images, setImages] = useState([]);
  const [mainIndex, setMainIndex] = useState(null);
  const [bannerIndexes, setBannerIndexes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [properties, setProperties] = useState([]);

  /* =========================
     LOAD PROPERTIES
  ========================= */
  const loadProperties = async () => {
    try {
      const res = await fetch(`${API_BASE}/property`);
      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load properties:", err);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const toggleFacing = (face) => {
    setForm((prev) => ({
      ...prev,
      facing: prev.facing.includes(face)
        ? prev.facing.filter((f) => f !== face)
        : [...prev.facing, face],
    }));
  };

  /* =========================
     ADD PROPERTY
  ========================= */
  const addProperty = async () => {
    if (isSubmitting) return;

    if (!form.title || !form.location || !form.typology || !form.status) {
      alert("Please fill all required fields");
      return;
    }

    if (!images.length) {
      alert("Please select images");
      return;
    }

    if (mainIndex === null) {
      alert("Select a MAIN image");
      return;
    }

    setIsSubmitting(true);

    try {
      /* 1️⃣ Upload images (Cloudinary via backend) */
      const uploadedUrls = [];

      for (let img of images) {
        const fd = new FormData();
        fd.append("image", img);

        const res = await fetch(`${API_BASE}/upload/image`, {
          method: "POST",
          body: fd,
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Image upload failed");
        }

        uploadedUrls.push(data.imageUrl);
      }

      /* 2️⃣ Format images (MATCH BACKEND SCHEMA) */
      const formattedImages = uploadedUrls.map((url, index) => ({
        url,
        isMain: index === mainIndex,
        isPropertyBanner: bannerIndexes.includes(index),
        isHomeBanner: false,
      }));

      /* 3️⃣ Save property (MATCH BACKEND FIELD NAMES) */
      const saveRes = await fetch(`${API_BASE}/property/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          projectCode: form.projectCode,
          location: form.location,
          flatType: form.typology, // ✅ send correct backend key
          constructionStatus: form.status, // ✅ send correct backend key
          unitSize: form.unitSize,
          price: form.price,
          uds: form.uds,
          remarks: form.remarks,
          facing: form.facing,
          showOnHome: form.showOnHome,
          images: formattedImages,
        }),
      });

      const saveData = await saveRes.json();

      if (!saveRes.ok) {
        throw new Error(saveData?.message || "Property save failed");
      }

      alert("✅ Property added successfully");

      /* RESET */
      setForm({
        title: "",
        projectCode: "",
        location: "",
        typology: "",
        status: "",
        unitSize: "",
        price: "",
        uds: "",
        remarks: "",
        facing: [],
        showOnHome: false,
      });

      setImages([]);
      setMainIndex(null);
      setBannerIndexes([]);
      if (fileInputRef.current) fileInputRef.current.value = "";

      loadProperties();
    } catch (err) {
      console.error("Add Property Error:", err);
      alert("❌ Failed to add property");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================
     TOGGLE HOME
  ========================= */
  const toggleHome = async (id) => {
    await fetch(`${API_BASE}/property/toggle-home/${id}`, {
      method: "PATCH",
      credentials: "include",
    });
    loadProperties();
  };

  /* =========================
     DELETE PROPERTY
  ========================= */
  const deleteProperty = async (id) => {
    if (!window.confirm("Delete property permanently?")) return;

    await fetch(`${API_BASE}/property/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadProperties();
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h2>Manage Properties</h2>
      </div>

      {/* ================= ADD PROPERTY ================= */}
      <div className="property-form-card">
        <h3>Add Property</h3>

        <div className="form-grid">
          <input
            name="title"
            placeholder="Project Name"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="projectCode"
            placeholder="Project Code"
            value={form.projectCode}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <select
            name="typology"
            value={form.typology}
            onChange={handleChange}
          >
            <option value="">Select Flat Type</option>
            {TYPOLOGY_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="">Project Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            name="unitSize"
            placeholder="Unit Size"
            value={form.unitSize}
            onChange={handleChange}
          />

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="uds"
            placeholder="UDS"
            value={form.uds}
            onChange={handleChange}
          />

          <textarea
            name="remarks"
            placeholder="Remarks"
            value={form.remarks}
            onChange={handleChange}
          />

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
          />
        </div>

        {/* Facing */}
        <div className="facing-box">
          <strong>Facing:</strong>
          {FACING_OPTIONS.map((f) => (
            <label key={f}>
              <input
                type="checkbox"
                checked={form.facing.includes(f)}
                onChange={() => toggleFacing(f)}
              />{" "}
              {f}
            </label>
          ))}
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="image-preview-grid">
            {images.map((img, index) => (
              <div key={index} className="image-preview">
                <img src={URL.createObjectURL(img)} alt="preview" />

                <label>
                  <input
                    type="radio"
                    checked={mainIndex === index}
                    onChange={() => setMainIndex(index)}
                  />{" "}
                  Main
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={bannerIndexes.includes(index)}
                    onChange={() =>
                      setBannerIndexes((prev) =>
                        prev.includes(index)
                          ? prev.filter((i) => i !== index)
                          : [...prev, index]
                      )
                    }
                  />{" "}
                  Property Banner
                </label>
              </div>
            ))}
          </div>
        )}

        <label>
          <input
            type="checkbox"
            name="showOnHome"
            checked={form.showOnHome}
            onChange={handleChange}
          />{" "}
          Show on Home Page
        </label>

        <button className="add-btn" onClick={addProperty} disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Property"}
        </button>
      </div>

      {/* ================= PROPERTY LIST ================= */}
      <div className="property-grid">
        {properties.map((p) => (
          <div className="property-admin-card" key={p._id}>
            <img
              src={p.images?.find((i) => i.isMain)?.url || p.images?.[0]?.url}
              alt={p.title}
            />
            <h4>{p.title}</h4>
            <p>{p.location}</p>
            <p>
              <b>Facing:</b> {p.facing?.join(", ")}
            </p>

            <button onClick={() => toggleHome(p._id)}>
              {p.showOnHome ? "Remove from Home" : "Add to Home"}
            </button>

            <button className="delete-btn" onClick={() => deleteProperty(p._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminProperties;
