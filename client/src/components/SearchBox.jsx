const styles = {
  container: {
    marginBottom: "24px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
};

const SearchBox = ({ search, setSearch }) => {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />
    </div>
  );
};

export default SearchBox;
