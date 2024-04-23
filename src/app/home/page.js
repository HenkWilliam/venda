"use client"

import { useState, useEffect } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsCardChecklist } from 'react-icons/bs';
import { IoTicketOutline } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';
import { BiStats } from 'react-icons/bi';

export default function Navbar({ currentPath }) {
  // Controlar a aba ativa
  const [activeTab, setActiveTab] = useState('');

  // Atualizar a aba ativa ao mudar de página
  useEffect(() => {
    setActiveTab(currentPath);
  }, [currentPath]);

  // componente
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-links">
          <li>
            <div className={`nav-link ${activeTab === '/cadastro_eventos/novo' ? 'active' : ''}`} onClick={() => window.location.href = '/cadastro_eventos/novo'}>
              <AiOutlineCalendar className="icon" />
              <span>Cadastro de Eventos</span>
            </div>
          </li>
          <li>
            <div className={`nav-link ${activeTab === '/cadastro_categorias/novo' ? 'active' : ''}`} onClick={() => window.location.href = '/cadastro_categorias/novo'}>
              <BsCardChecklist className="icon" />
              <span>Categorias de Ingressos</span>
            </div>
          </li>
          <li>
            <div className={`nav-link ${activeTab === '/cadastro_lotes/novo' ? 'active' : ''}`} onClick={() => window.location.href = '/cadastro_lotes/novo'}>
              <IoTicketOutline className="icon" />
              <span>Lotes de Ingressos</span>
            </div>
          </li>
          <li>
            <div className={`nav-link ${activeTab === '/cadastro_ingressos/novo' ? 'active' : ''}`} onClick={() => window.location.href = '/cadastro_ingressos/novo'}>
              <IoTicketOutline className="icon" />
              <span>Cadastro de Ingressos</span>
            </div>
          </li>
          <li>
            <div className={`nav-link ${activeTab === '/cadastro_clientes/novo' ? 'active' : ''}`} onClick={() => window.location.href = '/cadastro_clientes/novo'}>
              <FaUsers className="icon" />
              <span>Clientes</span>
            </div>
          </li>
          <li>
            <div className={`nav-link ${activeTab === '/relatorio_vendas' ? 'active' : ''}`} onClick={() => window.location.href = '/relatorio_vendas'}>
              <BiStats className="icon" />
              <span>Relatório de Vendas</span>
            </div>
          </li>
        </ul>
      </div>

      {/* CSS do componente */}
      <style jsx>{`
        .navbar {
          background: -webkit-linear-gradient(90deg, #4f7047, #006061, #174867); /* Gradiente linear */
          background: linear-gradient(90deg, #4f7047, #006061, #174867); /* Gradiente linear */
          padding: 10px 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-links {
          list-style-type: none;
          margin: 0;
          padding: 0;
          display: flex;
        }

        .nav-links li {
          margin-right: 20px;
        }

        .nav-links li:last-child {
          margin-right: 0;
        }

        .nav-link {
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .nav-link:hover,
        .active {
          color: #ccc;
        }

        .icon {
          margin-right: 10px;
        }
      `}</style>
    </nav>
  );
}
