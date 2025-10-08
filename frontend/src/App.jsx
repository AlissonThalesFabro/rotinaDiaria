import { useState, useEffect } from 'react'
import { api } from './services/Api'
import './App.css'
import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return <Dashboard />;
}

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')

  // Buscar usuários ao carregar a página
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const usersData = await api.getUsers()
      setUsers(usersData)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    }
  }

  const handleCreateUser = async () => {
    if (name.trim()) {
      try {
        await api.createUser({ name, email: `${name}@email.com` })
        setName('')
        loadUsers() // Recarregar a lista
      } catch (error) {
        console.error('Erro ao criar usuário:', error)
      }
    }
  }

  return (
    <div>
      <h1>Minha Rotina Diária</h1>
      
      <div>
        <h2>Adicionar Usuário</h2>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome"
        />
        <button onClick={handleCreateUser}>Criar Usuário</button>
      </div>

      <div>
        <h2>Usuários Cadastrados</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App