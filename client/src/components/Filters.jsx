import { useQuery } from "@tanstack/react-query";

const fetchFilters = async () => {
  const res = await fetch("/api/filters");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const styles = {
  container: {
    fontFamily: "sans-serif",
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  button: {
    padding: "6px 12px",
    border: "1px solid #ccc",
    borderRadius: "16px",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  activeButton: {
    backgroundColor: "#007bff",
    color: "white",
    borderColor: "#007bff",
    fontWeight: "bold",
  },
  title: {
    marginTop: "24px",
    marginBottom: "12px",
    fontSize: "1rem",
    color: "#333",
  },
  statusText: {
    color: "#7f8c8d",
  },
};

const Filters = ({ activeFilters, setFilters }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
  });

  const handleFilterClick = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  if (isLoading) return <p style={styles.statusText}>Loading filters...</p>;
  if (error) return <p style={styles.statusText}>Error loading filters.</p>;

  return (
    <div style={styles.container}>
      <div>
        <h4 style={styles.title}>Top 20 Nationalities</h4>
        <div style={styles.buttonContainer}>
          {data.nationalities.map((nat) => (
            <button
              key={nat}
              style={
                activeFilters.nationality === nat
                  ? { ...styles.button, ...styles.activeButton }
                  : styles.button
              }
              onClick={() => handleFilterClick("nationality", nat)}
            >
              {nat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 style={styles.title}>Top 20 Hobbies</h4>
        <div style={styles.buttonContainer}>
          {data.hobbies.map((hobby) => (
            <button
              key={hobby}
              style={
                activeFilters.hobby === hobby
                  ? { ...styles.button, ...styles.activeButton }
                  : styles.button
              }
              onClick={() => handleFilterClick("hobby", hobby)}
            >
              {hobby}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
