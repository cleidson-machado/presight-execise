import { useState } from "react";
import UserList from "./UserList";
import Filters from "./Filters";
import SearchBox from "./SearchBox";

const styles = {
  appContainer: {
    display: "flex",
    fontFamily: "sans-serif",
    height: "calc(100vh - 45px)",
  },
  sidebar: {
    width: "250px",
    padding: "20px",
    borderRight: "1px solid #ccc",
    height: "100%",
    overflowY: "auto",
  },
  mainContent: {
    flex: 1,
    height: "100%",
  },
};

function UserListPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    nationality: null,
    hobby: null,
  });

  return (
    <div style={styles.appContainer}>
      <aside style={styles.sidebar}>
        <h2>Filters</h2>
        <SearchBox setSearch={setSearch} />
        <Filters setFilters={setFilters} />
      </aside>
      <main style={styles.mainContent}>
        <UserList search={search} filters={filters} />
      </main>
    </div>
  );
}

export default UserListPage;
