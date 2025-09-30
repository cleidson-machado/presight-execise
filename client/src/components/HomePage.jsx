import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "10vh",
    padding: "50px 20px",
    fontFamily: "sans-serif",
  },
  content: {
    textAlign: "center",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  author: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "40px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  linkButton: {
    display: "inline-block",
    padding: "12px 25px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    width: "250px",
    transition: "background-color 0.2s",
  },
  disabledLinkButton: {
    backgroundColor: "#aaa",
    cursor: "not-allowed",
  },
  contactInfo: {
    marginTop: "60px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
    width: "100%",
    maxWidth: "400px",
  },
  contactLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
    color: "#333",
  },
  contactLink: {
    color: "#007bff",
    textDecoration: "none",
  },
};

const HomePage = () => {
  const handleDisabledClick = (e) => e.preventDefault();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Presight Code Challenge</h1>
        <p style={styles.author}>Developed by: Cleidson Pereira Machado</p>
        <div style={styles.buttonContainer}>
          <Link to="/task/1" style={styles.linkButton}>
            Task 1: User List
          </Link>
          <Link to="/task/2" style={styles.linkButton}>
            Task 2: Streamed Text
          </Link>
          <Link to="/task/3" style={styles.linkButton}>
            Task 3: Web Worker & Sockets
          </Link>
        </div>
      </div>

      <div style={styles.contactInfo}>
        <div style={styles.contactLine}>
          <span>📧</span>{" "}
          <a
            href="mailto:cleidson.adeveloper@gmail.com"
            style={styles.contactLink}
          >
            cleidson.adeveloper@gmail.com
          </a>
        </div>
        <div style={styles.contactLine}>
          <span>📱</span> <span>+351 914 363 615 / WhatsApp</span>
        </div>
        <div style={styles.contactLine}>
          <span>📱</span> <span>+351 929 060 451 / Phone & SMS</span>
        </div>
        <div style={styles.contactLine}>
          <span>📱</span> <span>+55 67 9-8407-3221 / WhatsApp</span>
        </div>
        <div style={styles.contactLine}>
          <span>🔗</span>{" "}
          <a
            href="https://linkedin.com/in/cleidson-pereira-machado"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.contactLink}
          >
            linkedin.com/in/cleidson-pereira-machado
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
