import { useQuery } from '@tanstack/react-query';

const fetchFilters = async () => {
  const res = await fetch('/api/filters');
  if (!res.ok) {
    throw new Error('Não foi possível carregar os filtros');
  }
  return res.json();
};

const Filters = ({ setFilters }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['filters'],
    queryFn: fetchFilters,
  });

  if (isLoading) return <p>Carregando filtros...</p>;
  if (error) return <p>Erro ao carregar filtros.</p>;

  const handleFilterClick = (type, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: prevFilters[type] === value ? null : value,
    }));
  };

  return (
    <div>
      <h4>Top 20 Nacionalidades</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.nationalities.map(nat => (
          <li key={nat} style={{ marginBottom: '4px' }}>
            <button onClick={() => handleFilterClick('nationality', nat)}>
              {nat}
            </button>
          </li>
        ))}
      </ul>

      <h4>Top 20 Hobbies</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.hobbies.map(hobby => (
          <li key={hobby} style={{ marginBottom: '4px' }}>
            <button onClick={() => handleFilterClick('hobby', hobby)}>
              {hobby}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;