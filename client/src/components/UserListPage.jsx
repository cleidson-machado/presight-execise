import { useState } from "react";
import UserList from "./UserList";
import Filters from "./Filters";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

function UserListPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    nationality: null,
    hobby: null,
  });
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleClearFilters = () => {
    setSearch("");
    setFilters({ nationality: null, hobby: null });
  };

  const styles = {
    pageContainer: {
      display: "flex",
      fontFamily: "sans-serif",
      height: "100vh",
      backgroundColor: "#f9f9f9",
    },
    sidebar: {
      width: "280px",
      padding: "20px",
      borderRight: "1px solid #e0e0e0",
      backgroundColor: "#ffffff",
      position: "sticky",
      top: 0,
      height: "100vh",
      overflowY: "auto",
      transition: "transform 0.3s ease-in-out",
      boxSizing: "border-box",
      "@media (maxWidth: 768px)": {
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
        transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
      },
    },
    mainContent: {
      flex: 1,
      height: "100vh",
      overflowY: "auto",
    },
    mobileHeader: {
      display: "none",
      padding: "10px 15px",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e0e0e0",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 900,
      "@media (maxWidth: 768px)": {
        display: "flex",
      },
    },
    hamburgerButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "5px",
    },
    hamburgerIconLine: {
      display: "block",
      width: "24px",
      height: "3px",
      backgroundColor: "#333",
      margin: "5px 0",
    },
    backLink: {
      textDecoration: "none",
      fontWeight: "bold",
      color: "#007bff",
    },
    overlay: {
      display: isSidebarOpen ? "block" : "none",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
      "@media (minWidth: 769px)": {
        display: "none",
      },
    },
    filterHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    filterTitle: {
      margin: 0,
      fontSize: "1.5rem",
    },
    clearButton: {
      background: "none",
      border: "none",
      color: "#007bff",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "bold",
      padding: "8px",
    },
  };

  const isMobile = window.innerWidth <= 768;
  const sidebarStyle = {
    ...styles.sidebar,
    ...(isMobile ? styles.sidebar["@media (maxWidth: 768px)"] : {}),
  };
  const mobileHeaderStyle = {
    ...styles.mobileHeader,
    ...(isMobile ? styles.mobileHeader["@media (maxWidth: 768px)"] : {}),
  };
  const overlayStyle = {
    ...styles.overlay,
    ...(isMobile ? {} : styles.overlay["@media (minWidth: 769px)"]),
  };

  return (
    <div style={styles.pageContainer}>
      <div style={overlayStyle} onClick={() => setSidebarOpen(false)}></div>
      <aside style={sidebarStyle}>
        <div style={styles.filterHeader}>
          <h2 style={styles.filterTitle}>Filters</h2>
          <button style={styles.clearButton} onClick={handleClearFilters}>
            Clear
          </button>
        </div>
        <SearchBox search={search} setSearch={setSearch} />
        <Filters activeFilters={filters} setFilters={setFilters} />
      </aside>
      <main style={styles.mainContent}>
        <div style={mobileHeaderStyle}>
          <button
            style={styles.hamburgerButton}
            onClick={() => setSidebarOpen(true)}
          >
            <span style={styles.hamburgerIconLine}></span>
            <span style={styles.hamburgerIconLine}></span>
            <span style={styles.hamburgerIconLine}></span>
          </button>
          <Link to="/" style={styles.backLink}>
            &larr; Back to Home
          </Link>
        </div>
        <UserList search={search} filters={filters} />
      </main>
    </div>
  );
}

export default UserListPage;
