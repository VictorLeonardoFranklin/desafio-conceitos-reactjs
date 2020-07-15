import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      url: "https://github.com/VictorLeonardoFranklin/desafio-conceitos-reactjs",
      title: `Umbriel ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const repositoryIndex = repositories.findIndex(rep => rep.id === id);
    const response = await api.delete(`repositories/${id}`);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((rep, index) => (<>
          <li key={index}>{rep.title}</li>
          <button onClick={() => handleRemoveRepository(rep.id)}>Remover</button>
        </>))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
