"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function CadastroIngressos() {
  const [formulario, setFormulario] = useState({
    quantidade: '',
    valor: '',
    eventoId: '',
    categoriaId: '',
    loteId: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [ingressos, setIngressos] = useState([]);
  const [erroValidacao, setErroValidacao] = useState('');

  useEffect(() => {
    const carregarIngressos = async () => {
      try {
        const response = await axios.get("/api/ingressos");
        setIngressos(response.data);
      } catch (error) {
        console.error("Erro ao carregar ingressos:", error);
      }
    };
    carregarIngressos();
  }, []);

  const schema = yup.object().shape({
    quantidade: yup.number().positive().required('Quantidade é obrigatória'),
    valor: yup.number().positive().required('Valor é obrigatório'),
    eventoId: yup.string().required('ID do evento é obrigatório'),
    categoriaId: yup.string().required('ID da categoria é obrigatório'),
    loteId: yup.string().required('ID do lote é obrigatório'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroValidacao('');

    try {
      await schema.validate(formulario, { abortEarly: false });

      const novoIngresso = {
        quantidade: parseInt(formulario.quantidade),
        valor: parseFloat(formulario.valor),
        eventoId: formulario.eventoId,
        categoriaId: formulario.categoriaId,
        loteId: formulario.loteId
      };

      const response = await axios.post("/api/ingressos", novoIngresso);
      setMensagem("Ingresso cadastrado com sucesso!");
      setFormulario({
        quantidade: '',
        valor: '',
        eventoId: '',
        categoriaId: '',
        loteId: ''
      });
      setIngressos([...ingressos, response.data]);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.map(e => e.message);
        setErroValidacao(errors.join(', '));
      } else {
        setMensagem("Erro ao cadastrar ingresso.");
        console.error("Erro ao cadastrar ingresso:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Cadastro de Ingressos</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="quantidade">Quantidade:</label>
            <input type="number" id="quantidade" name="quantidade" value={formulario.quantidade} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="valor">Valor:</label>
            <input type="number" id="valor" name="valor" value={formulario.valor} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="eventoId">Evento:</label>
            <input type="text" id="eventoId" name="eventoId" value={formulario.eventoId} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="categoriaId">Categoria:</label>
            <input type="text" id="categoriaId" name="categoriaId" value={formulario.categoriaId} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="loteId">Lote:</label>
            <input type="text" id="loteId" name="loteId" value={formulario.loteId} onChange={handleChange} required />
          </div>
          <button type="submit" className="button">Cadastrar</button>
        </form>
        {erroValidacao && <p>{erroValidacao}</p>}
        {mensagem && <p>{mensagem}</p>}
      </div>
      <div className="lista-container">
        <h2>Ingressos Cadastrados</h2>
        <ul>
          {ingressos.map((ingresso) => (
            <li key={ingresso.id} className="ingresso-item">
              <div className="ingresso-info">
                <strong>Quantidade: </strong>{ingresso.quantidade}<br />
                <strong>Valor: </strong>{ingresso.valor}<br />
                <strong>Evento ID: </strong>{ingresso.eventoId}<br />
                <strong>Categoria ID: </strong>{ingresso.categoriaId}<br />
                <strong>Lote ID: </strong>{ingresso.loteId}<br />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .form-container {
          flex: 1;
        }

        .lista-container {
          flex: 1;
          padding-left: 20px;
          border-left: 1px solid #ccc;
          margin-left: 20px;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        h2 {
          font-size: 20px;
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
        input[type="number"] {
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

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .ingresso-item {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
        }

        .ingresso-info {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
