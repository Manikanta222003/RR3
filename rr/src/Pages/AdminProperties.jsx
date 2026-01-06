import { useEffect, useRef, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/AdminProperties.css";

const API_BASE = "https://rr3-1-wo2n.onrender.com";

function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const fileInputRef = useRef(null);

  /* =========================
     FORM STATE
  ========================= */
  const [form, setForm] = useState({
    title: "",
    location: "",
    city: "",
    locality: "",
    typology: "",
    status: "",
    unitSize: "",
    price: "",
    showOnHome: false,
    isNewLaunch: true,
  });

  /* =========================
     IMAGE STATES
  ========================= */
  const [images, setImages] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(null);
  const [useAsBanner, setUseAsBanner] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================
     LOAD PROPERTIES
  ========================= */
  const loadProperties = async () => {
    const res = await fetch(`${API_BASE}/property`, {
      credentials: "include",
    });
    const data = await res.json();
    setProperties(Array.isArray(data) ? data : data.properties || []);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  /* =========================
     ADD PROPERTY
  ========================= */
  const addProperty = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (!form.title || !form.location) {
        alert("Title and Location are required");
        return;
      }

      if (images.length === 0) {
        alert("Please select at least one image");
        return;
      }

      if (useAsBanner && bannerIndex === null) {
        alert("Please select a banner image");
        return;
      }

      /* 1️⃣ Upload images */
      const uploadedUrls = [];

      for (let img of images) {
        const fd = new FormData();
        fd.append("image", img);

        const uploadRes = await fetch(
          `${API_BASE}/upload/image`,
          {
            method: "POST",
            credentials: "include",
            body: fd,
          }
        );

        if (!uploadRes.ok) throw new Error("Image upload failed");

        const uploadData = await uploadRes.json();
        uploadedUrls.push(uploadData.imageUrl);
      }

      /* 2️⃣ Format images */
      const formattedImages = uploadedUrls.map((url, index) => ({
        url,
        isBanner: useAsBanner && index === bannerIndex,
      }));

      /* 3️⃣ Save property */
      const res = await fetch(`${API_BASE}/property/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          useAsBanner,
          images: formattedImages,
        }),
      });

      if (!res.ok) throw new Error("Property save failed");

      alert("Property added successfully");

      /* RESET FORM */
      setForm({
        title: "",
        location: "",
        city: "",
        locality: "",
        typology: "",
        status: "",
        unitSize: "",
        price: "",
        showOnHome: false,
        isNewLaunch: true,
      });

      setImages([]);
      setBannerIndex(null);
      setUseAsBanner(false);

      if (fileInputRef.current) fileInputRef.current.value = "";

      loadProperties();
    } catch (err) {
      console.error(err);
      alert("Failed to add property");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================
     TOGGLE HOME VISIBILITY
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

      {/* ADD PROPERTY */}
      <div className="property-form-card">
        <h3>Add Property</h3>

        <div className="form-grid">
          {Object.keys(form)
            .filter((key) => !["showOnHome", "isNewLaunch"].includes(key))
            .map((key) => (
              <input
                key={key}
                name={key}
                placeholder={key === "price" ? "Price" : key}
                value={form[key]}
                onChange={handleChange}
              />
            ))}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />
        </div>

        <label>
          <input
            type="checkbox"
            name="showOnHome"
            checked={form.showOnHome}
            onChange={handleChange}
          />{" "}
          Show on Home Page
        </label>

        <label>
          <input
            type="checkbox"
            checked={useAsBanner}
            onChange={(e) => setUseAsBanner(e.target.checked)}
          />{" "}
          Use images in Banner section
        </label>

        {images.length > 0 && useAsBanner && (
          <div className="image-preview-grid">
            {images.map((img, index) => (
              <div
                key={index}
                className={`image-preview ${
                  bannerIndex === index ? "selected" : ""
                }`}
              >
                <img src={URL.createObjectURL(img)} alt="preview" />
                <label>
                  <input
                    type="radio"
                    checked={bannerIndex === index}
                    onChange={() => setBannerIndex(index)}
                  />
                  Banner Image
                </label>
              </div>
            ))}
          </div>
        )}

        <button
          className="add-btn"
          onClick={addProperty}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Property"}
        </button>
      </div>

      {/* PROPERTY LIST */}
      <div className="property-grid">
        {properties.map((p) => (
          <div className="property-admin-card" key={p._id}>
            <img src={p.images?.[0]?.url} alt={p.title} />
            <h4>{p.title}</h4>
            <p>{p.location}</p>
            <p><strong>Price:</strong> {p.price}</p>

            <button
              className="home-toggle-btn"
              onClick={() => toggleHome(p._id)}
            >
              {p.showOnHome ? "Remove from Home" : "Add to Home"}
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteProperty(p._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminProperties;
