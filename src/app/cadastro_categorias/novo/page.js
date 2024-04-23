"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function CadastroCategoriaIngresso() {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    descricao: yup.string().required('Descrição é obrigatória'),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao carregar categorias de ingresso:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await schema.validate({ nome, descricao });

      const novaCategoria = {
        nome,
        descricao,
      };

      const response = await axios.post("/api/categorias", novaCategoria);
      setMensagem("Categoria de ingresso cadastrada com sucesso!");
      setNome('');
      setDescricao('');
      setCategorias([...categorias, response.data]);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErro(error.message);
      } else {
        setErro("Erro ao cadastrar categoria de ingresso.");
        console.error("Erro ao cadastrar categoria de ingresso:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="form">
          <h1>Cadastro de Categoria de Ingresso</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descrição:</label>
              <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>
            <button type="submit" className="button">Cadastrar</button>
            {erro && <p className="error">{erro}</p>}
            {mensagem && <p className="success">{mensagem}</p>}
          </form>
        </div>
        <div className="categorias">
          <h2>Categorias Cadastradas</h2>
          <ul>
            {categorias.map((categoria, index) => (
              <li key={index}>
                <strong>{categoria.nome}</strong> - {categoria.descricao}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form {
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
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
        textarea {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        textarea {
          resize: vertical;
          height: 100px;
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

        .categorias {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
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
