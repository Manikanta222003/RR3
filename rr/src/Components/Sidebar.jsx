import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Company Name</h2>

      <nav>
        {/* <NavLink to="/admin/dashboard">Dashboard</NavLink> */}
         <NavLink to="/admin/contacts">Contact_Page</NavLink>
        <NavLink to="/admin/banner">Banners</NavLink>
      <NavLink to="/admin/properties">Properties</NavLink>

        <NavLink to="/admin/faq">FAQs</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
