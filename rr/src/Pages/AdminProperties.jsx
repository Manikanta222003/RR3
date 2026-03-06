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

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [mainIndex, setMainIndex] = useState(null);
  const [bannerIndexes, setBannerIndexes] = useState([]);

  const [properties, setProperties] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  /* =========================
     LOAD PROPERTIES
  ========================= */
  const loadProperties = async () => {

    try {

      const res = await fetch(`${API_BASE}/property`);
      const data = await res.json();

      setProperties(Array.isArray(data) ? data : []);

    } catch (err) {

      console.error("Load properties failed", err);

    }

  };

  useEffect(() => {
    loadProperties();
  }, []);

  /* =========================
     FORM HANDLERS
  ========================= */
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

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
     EDIT PROPERTY
  ========================= */
  const editProperty = (property) => {

    setEditId(property._id);

    setForm({
      title: property.title || "",
      projectCode: property.projectCode || "",
      location: property.location || "",
      typology: property.flatType || "",
      status: property.constructionStatus || "",
      unitSize: property.unitSize || "",
      price: property.price || "",
      uds: property.uds || "",
      remarks: property.remarks || "",
      facing: property.facing || [],
      showOnHome: property.showOnHome || false,
    });

    setExistingImages(property.images || []);
    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  /* =========================
     DELETE IMAGE
  ========================= */
  const deleteImage = async (imageUrl) => {

    if (!window.confirm("Delete this image?")) return;

    await fetch(`${API_BASE}/property/delete-image`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        propertyId: editId,
        imageUrl,
      }),
    });

    setExistingImages((prev) =>
      prev.filter((img) => img.url !== imageUrl)
    );

  };

  /* =========================
     ADD PROPERTY
  ========================= */
  const addProperty = async () => {

    if (!form.title || !form.location || !form.typology || !form.status) {
      alert("Fill required fields");
      return;
    }

    if (!images.length) {
      alert("Select images");
      return;
    }

    setIsSubmitting(true);

    try {

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

        uploadedUrls.push(data.imageUrl);

      }

      const formattedImages = uploadedUrls.map((url, index) => ({
        url,
        isMain: index === mainIndex,
        isPropertyBanner: bannerIndexes.includes(index),
        isHomeBanner: false,
      }));

      await fetch(`${API_BASE}/property/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          projectCode: form.projectCode,
          location: form.location,
          flatType: form.typology,
          constructionStatus: form.status,
          unitSize: form.unitSize,
          price: form.price,
          uds: form.uds,
          remarks: form.remarks,
          facing: form.facing,
          showOnHome: form.showOnHome,
          images: formattedImages,
        }),
      });

      alert("Property added");

      resetForm();
      loadProperties();

    } catch (err) {

      console.error(err);
      alert("Add property failed");

    }

    setIsSubmitting(false);

  };

  /* =========================
     UPDATE PROPERTY
  ========================= */
  const updateProperty = async () => {

    try {

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

        uploadedUrls.push(data.imageUrl);

      }

      const formattedImages = uploadedUrls.map((url) => ({
        url,
        isMain: false,
        isPropertyBanner: false,
        isHomeBanner: false,
      }));

      await fetch(`${API_BASE}/property/update/${editId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          flatType: form.typology,
          constructionStatus: form.status,
          images: formattedImages,
        }),
      });

      alert("Property updated");

      resetForm();
      loadProperties();

    } catch (err) {

      console.error(err);
      alert("Update failed");

    }

  };

  /* =========================
     RESET FORM
  ========================= */
  const resetForm = () => {

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
    setExistingImages([]);
    setMainIndex(null);
    setBannerIndexes([]);
    setEditId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
        <h2>{editId ? "Edit Property" : "Add Property"}</h2>
      </div>

      {/* FORM */}
      <div className="property-form-card">

        <div className="form-grid">

          <input name="title" placeholder="Project Name"
            value={form.title} onChange={handleChange} />

          <input name="projectCode" placeholder="Project Code"
            value={form.projectCode} onChange={handleChange} />

          <input name="location" placeholder="Location"
            value={form.location} onChange={handleChange} />

          <select name="typology"
            value={form.typology} onChange={handleChange}>
            <option value="">Flat Type</option>
            {TYPOLOGY_OPTIONS.map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select name="status"
            value={form.status} onChange={handleChange}>
            <option value="">Status</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <input name="unitSize" placeholder="Unit Size"
            value={form.unitSize} onChange={handleChange} />

          <input name="price" placeholder="Price"
            value={form.price} onChange={handleChange} />

          <input name="uds" placeholder="UDS"
            value={form.uds} onChange={handleChange} />

          <textarea name="remarks" placeholder="Remarks"
            value={form.remarks} onChange={handleChange} />

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />

        </div>

        {/* EXISTING IMAGES */}
        {existingImages.length > 0 && (
          <div className="image-preview-grid">
            {existingImages.map((img, i) => (
              <div key={i} className="image-preview">
                <img src={img.url} alt="" />
                <button
                  className="delete-btn"
                  onClick={() => deleteImage(img.url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          className="add-btn"
          onClick={editId ? updateProperty : addProperty}
        >
          {editId ? "Update Property" : "Add Property"}
        </button>

      </div>

      {/* PROPERTY LIST */}
      <div className="property-grid">

        {properties.map((p) => (

          <div className="property-admin-card" key={p._id}>

            <img
              src={p.images?.find(i => i.isMain)?.url || p.images?.[0]?.url}
              alt={p.title}
            />

            <h4>{p.title}</h4>
            <p>{p.location}</p>

            <button onClick={() => editProperty(p)}>Edit</button>

            <button onClick={() => toggleHome(p._id)}>
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


