import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('Carregando...');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Erro ao conectar com o servidor!'));
  }, []);

  return (
    <div>
      <h1>Teste Monorepo</h1>
      <p>Mensagem do Servidor: <strong>{message}</strong></p>
    </div>
  );
}

export default App;