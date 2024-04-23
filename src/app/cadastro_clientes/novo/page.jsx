"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CadastroClientes() {
  // armazenar a lista de clientes
  const [clientes, setClientes] = useState([]);
  // campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  // mensagens de sucesso ou erro
  const [mensagem, setMensagem] = useState('');

  // Efeito para carregar a lista de clientes ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    };
    fetchData();
  }, []);

  //  lidar com o envio do formulário de cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();

    // dados do novo cliente
    const novoCliente = {
      nome,
      email
    };

    try {
      // Requisição POST para cadastrar o novo cliente
      const response = await axios.post("/api/clientes", novoCliente);
      // Atualiza a lista de clientes com o novo cliente cadastrado
      setClientes([...clientes, response.data]);
      setMensagem("Cliente cadastrado com sucesso!");
      setNome('');
      setEmail('');
    } catch (error) {
      setMensagem("Erro ao cadastrar cliente.");
      console.error("Erro ao cadastrar cliente:", error);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Clientes</h1>
      {/* Formulário de cadastro de clientes */}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          {/* Exibe mensagem de erro ou sucesso */}
          {mensagem && <p>{mensagem}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {/* Exibe mensagem de erro ou sucesso */}
          {mensagem && <p>{mensagem}</p>}
        </div>
        <button type="submit" className="button">Cadastrar Cliente</button>
      </form>

      {/* Lista de clientes cadastrados */}
      <div className="clientes">
        <h2>Clientes Cadastrados</h2>
        <ul>
          {/* lista */}
          {clientes.map((cliente) => (
            <li key={cliente.id}>
              <strong>{cliente.nome}</strong> - {cliente.email}
            </li>
          ))}
        </ul>
      </div>

      {/* CSS */}
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input[type="text"],
        input[type="email"] {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .button {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .button:hover {
          background-color: #0056b3;
        }

        .clientes {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
          margin-top: 20px;
        }

        h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
}
