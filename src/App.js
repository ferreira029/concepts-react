import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post("/repositories", { 
      title: `aprendendo-react - ${Date.now()}`,
      url: "https://github.com/ferreira029/aprendendo-react",
      techs: ['React', 'React Native', 'VueJs', 'TypeScript'], 
    });

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
    return response.status;
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => <li key={repository.id}>
          { repository.title }
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
