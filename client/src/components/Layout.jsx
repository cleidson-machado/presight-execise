import { Outlet, Link } from "react-router-dom";

const styles = {
  nav: {
    padding: "10px 20px",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ccc",
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    color: "#007bff",
  },
};

const Layout = () => {
  return (
    <div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>
          &larr; Back to Home
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
