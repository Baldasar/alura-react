import React, { useState, useEffect } from "react";
import "./style.css";

import { Card } from "../../components/card";

interface User {
  name: string;
  time: string;
}

export function Home() {
  const [userName, setUserName] = useState("");
  const [users, setAllUsers] = useState([] as any);
  const [repos, setRepos] = useState([] as any);

  function addUser() {
    const newUser: User = {
      name: userName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setAllUsers([...users, newUser]);
  }

  useEffect(() => {
    fetch("https://api.github.com/users/Baldasar")
      .then((response) => response.json())
      .then((data) => {
        setRepos({
          name: data.name,
          avatar: data.avatar_url,
        });
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{repos.name}</strong>
          <img src={repos.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite  o nome..."
        onChange={(e) => setUserName(e.target.value)}
      />

      {userName.length > 0 ? (
        <button type="button" onClick={addUser}>
          Adicionar
        </button>
      ) : (
        <button disabled type="button" onClick={addUser}>
          Adicionar
        </button>
      )}

      {users.length
        ? users.map((user: User) => (
            <Card key={user.time} name={user.name} time={user.time} />
          ))
        : []}
    </div>
  );
}
