const UserCard = ({ user }) => {
  const hobbiesToShow = user.hobbies.slice(0, 2);
  const remainingHobbies = user.hobbies.length - hobbiesToShow.length;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img
          src={user.avatar}
          alt="avatar"
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0 }}>
            {user.first_name} {user.last_name}
          </h3>
          <p style={{ margin: "4px 0" }}>
            {user.nationality}, {user.age} years old
          </p>
        </div>
      </div>
      <div style={{ marginTop: "12px" }}>
        <strong>Hobbies:</strong>
        {hobbiesToShow.length > 0 ? (
          <span>
            {" "}
            {hobbiesToShow.join(", ")}
            {remainingHobbies > 0 && ` (+${remainingHobbies})`}
          </span>
        ) : (
          <span> None</span>
        )}
      </div>
    </div>
  );
};

export default UserCard;
