import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const styles = {
    backLink: {
      display: "block",
      padding: "20px 20px 0",
      textDecoration: "none",
      fontWeight: "bold",
      color: "#007bff",
      fontFamily: "sans-serif",
      "@media (maxWidth: 768px)": {
        display: "none",
      },
    },
  };

  const isMobile = window.innerWidth <= 768;
  const backLinkStyle = {
    ...styles.backLink,
    ...(isMobile ? styles.backLink["@media (maxWidth: 768px)"] : {}),
  };

  return (
    <div>
      <Link to="/" style={backLinkStyle}>
        &larr; Back to Home
      </Link>
      <Outlet />
    </div>
  );
};

export default Layout;
