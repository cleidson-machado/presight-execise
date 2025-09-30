import { useState } from 'react';
import UserList from './components/UserList';
import Filters from './components/Filters';
import SearchBox from './components/SearchBox';

const styles = {
  appContainer: {
    display: 'flex',
    fontFamily: 'sans-serif',
  },
  sidebar: {
    width: '250px',
    padding: '20px',
    borderRight: '1px solid #ccc',
    height: '100vh',
    overflowY: 'auto',
  },
  mainContent: {
    flex: 1,
    height: '100vh',
  },
};

function App() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    nationality: null,
    hobby: null,
  });

  return (
    <div style={styles.appContainer}>
      <aside style={styles.sidebar}>
        <h2>Filtros</h2>
        <SearchBox setSearch={setSearch} />
        <Filters setFilters={setFilters} />
      </aside>
      <main style={styles.mainContent}>
        <UserList search={search} filters={filters} />
      </main>
    </div>
  );
}

export default App;