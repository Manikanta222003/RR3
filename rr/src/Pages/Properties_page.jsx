import { useEffect, useState } from "react";
import "../styles/Properties_page.css";
import logo from "../assets/Images/rr-logo.png";

/* 🔒 STATIC IMAGES */
import img1 from "../assets/Images/property2.png";
import img2 from "../assets/Images/property3.png";
import img3 from "../assets/Images/property4.png";
import img4 from "../assets/Images/property5.png";

/* 🔒 STATIC PROPERTIES */
const STATIC_PROPERTIES = [
  {
    _id: "static-1",
    title: "Dr.Y.V.Rao's Enclave 3 BHK Luxury Apartments",
    location: "Sri Ram Nagar, Kakinada",
    city: "Kakinada",
    locality: "Sri Ram Nagar",
    typology: "3 BHK",
    status: "New Launch",
    unitSize: "1911 Sq. Ft. East Facing",
    price: "Price On Request",
    images: [{ url: img1 }],
  },
  {
    _id: "static-2",
    title: "Signature Suite 3 BHK Luxury Apartments",
    location: "Mehar Nagar, Kakinada",
    city: "Kakinada",
    locality: "Mehar Nagar",
    typology: "3 BHK",
    status: "New Launch",
    unitSize: "1551 Sq. Ft. East & West Facing",
    price: "Price On Request",
    images: [{ url: img2 }],
  },
  {
    _id: "static-3",
    title: "Venkatadhri 3 BHK Luxury Apartments",
    location: "Near New DMART, Turangi",
    city: "Kakinada",
    locality: "Turangi",
    typology: "3 BHK",
    status: "New Launch",
    unitSize: "1405 Sq. Ft. North & South Facing",
    price: "Price On Request",
    images: [{ url: img3 }],
  },
  {
    _id: "static-4",
    title: "Surya's Velvet Vista 3 BHK Luxury Apartments",
    location: "Venkatanagar, Kakinada",
    city: "Kakinada",
    locality: "Venkatanagar",
    typology: "3 BHK",
    status: "New Launch",
    unitSize: "1725 Sq. Ft. North Facing",
    price: "Price On Request",
    images: [{ url: img4 }],
  },
];

function Properties_page() {
  const [backendProperties, setBackendProperties] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  /* 🔹 LOAD BACKEND PROPERTIES */
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const res = await fetch(
          "https://rr3-1-wo2n.onrender.com/property",
          { credentials: "include" } // safe even for public
        );

        const data = await res.json();

        // ✅ Handle both response styles
        const properties = Array.isArray(data)
          ? data
          : data.properties || [];

        setBackendProperties(properties);
      } catch (err) {
        console.error("Failed to load properties", err);
      }
    };

    loadProperties();
  }, []);

  /* 🔹 MERGED PROPERTIES */
  const allProperties = [...STATIC_PROPERTIES, ...backendProperties];

  /* 🔹 FILTER OPTIONS */
  const filterOptions = {
    cities: [...new Set(allProperties.map(p => p.city).filter(Boolean))],
    localities: [...new Set(allProperties.map(p => p.locality).filter(Boolean))],
    typologies: [...new Set(allProperties.map(p => p.typology).filter(Boolean))],
    statuses: [...new Set(allProperties.map(p => p.status).filter(Boolean))],
  };

  /* 🔹 FILTER STATE */
  const [tempSearch, setTempSearch] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [tempLocality, setTempLocality] = useState("");
  const [tempTypology, setTempTypology] = useState("");
  const [tempStatus, setTempStatus] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    locality: "",
    typology: "",
    status: "",
  });

  const applyFilters = () => {
    setFilters({
      search: tempSearch,
      city: tempCity,
      locality: tempLocality,
      typology: tempTypology,
      status: tempStatus,
    });
  };

  const clearFilters = () => {
    setTempSearch("");
    setTempCity("");
    setTempLocality("");
    setTempTypology("");
    setTempStatus("");
    setFilters({
      search: "",
      city: "",
      locality: "",
      typology: "",
      status: "",
    });
  };

  /* 🔹 FILTERED PROPERTIES */
  const filteredProperties = allProperties.filter((p) =>
    (filters.search === "" ||
      p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.location.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.city === "" || p.city === filters.city) &&
    (filters.locality === "" || p.locality === filters.locality) &&
    (filters.typology === "" || p.typology === filters.typology) &&
    (filters.status === "" || p.status === filters.status)
  );

  /* 🔹 BANNER IMAGES */
  const bannerImages = [
    ...new Set(
      allProperties
        .map(p => p.images?.[0]?.url)
        .filter(Boolean)
    ),
  ];

  useEffect(() => {
    if (bannerImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBanner(prev =>
        prev === bannerImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [bannerImages]);

  return (
    <section className="property-section">
      {/* 🔥 BANNER */}
      <div className="property-banner">
        {bannerImages.length > 0 && (
          <img src={bannerImages[currentBanner]} alt="Banner" />
        )}
      </div>

      {/* 🔍 FILTER BAR */}
      <div className="filter-bar">
        <h3>All Projects</h3>

        <input
          placeholder="Search project or location"
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
        />

        <select value={tempCity} onChange={(e) => setTempCity(e.target.value)}>
          <option value="">City</option>
          {filterOptions.cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={tempLocality} onChange={(e) => setTempLocality(e.target.value)}>
          <option value="">Locality</option>
          {filterOptions.localities.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>

        <select value={tempTypology} onChange={(e) => setTempTypology(e.target.value)}>
          <option value="">Typology</option>
          {filterOptions.typologies.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select value={tempStatus} onChange={(e) => setTempStatus(e.target.value)}>
          <option value="">Status</option>
          {filterOptions.statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button className="clear-btn" onClick={clearFilters}>CLEAR</button>
        <button className="apply-btn" onClick={applyFilters}>APPLY</button>
      </div>

      {/* 🏠 PROPERTY CARDS */}
      <div className="property-flex">
        {filteredProperties.map((item) => (
          <div className="property-card" key={item._id}>
            <div className="property-image">
              <img
                src={item.images?.[0]?.url}
                alt={item.title}
              />
              <span className="new-launch-badge">{item.status}</span>
              <div className="property-logo">
                <img src={logo} alt="Logo" />
              </div>
            </div>

            <div className="property-content">
              <h3>{item.title}</h3>
              <p>📍 {item.location}</p>
              <p><strong>Unit Size:</strong> {item.unitSize}</p>
              <p><strong>Price:</strong> {item.price}</p>
              <a href="/contacts">
                <button className="property-btn">Contact Us</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Properties_page;
