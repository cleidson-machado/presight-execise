const UserCard = ({ user }) => {
  const styles = {
    card: {
      backgroundColor: "#f8fcff",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 6px 16px rgba(0, 123, 255, 0.1)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
      boxSizing: "border-box",
      fontFamily: "sans-serif",
    },
    avatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      marginBottom: "16px",
      border: "3px solid #ffffff",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    name: {
      margin: 0,
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#2c3e50",
    },
    details: {
      margin: "4px 0 20px",
      fontSize: "0.9rem",
      color: "#7f8c8d",
      minHeight: "36px",
    },
    actionButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "10px 20px",
      fontWeight: "bold",
      cursor: "pointer",
      width: "80%",
      transition: "background-color 0.2s",
    },
  };

  return (
    <div style={styles.card}>
      <div>
        <img src={user.avatar} alt="avatar" style={styles.avatar} />
        <h3 style={styles.name}>
          {user.first_name} {user.last_name}
        </h3>
        <p style={styles.details}>
          {user.nationality}, {user.age} years old
        </p>
      </div>
      <button style={styles.actionButton}>View Profile</button>
    </div>
  );
};

export default UserCard;
