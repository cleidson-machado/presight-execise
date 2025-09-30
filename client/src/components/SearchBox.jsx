import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBox = ({ setSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearch]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search by name..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />
    </div>
  );
};

export default SearchBox;
