"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

export default function RelatorioVendas() {
  // Estado para armazenar as vendas e o total vendido
  const [vendas, setVendas] = useState([]);
  const [totalVendido, setTotalVendido] = useState(0);

  // Função para buscar as vendas ao carregar o componente
  useEffect(() => {
    async function fetchVendas() {
      try {
        const response = await axios.get("/api/relatorio-vendas");
        // Atualiza o estado das vendas
        setVendas(response.data);
        // Calcula o total vendido somando o valorTotal de todas as vendas
        const total = response.data.reduce((acc, venda) => acc + venda.valorTotal, 0);
        // Atualiza o estado do total vendido
        setTotalVendido(total);
      } catch (error) {
        console.error("Erro ao buscar relatório de vendas:", error);
      }
    }
    fetchVendas();
  }, []);

  // Configurações do gráfico
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: vendas.map(venda => venda.dataVenda),
    },
    yaxis: {
      title: {
        text: 'Valor Total Vendido'
      }
    },
    fill: {
      colors: ['#007bff'] // Cor do gráfico
    }
  };

  // Dados do gráfico
  const series = [{
    name: 'Vendas',
    data: vendas.map(venda => venda.valorTotal)
  }];

  return (
    <div className="container">
      <h1>Relatório de Vendas</h1>
      <div className="chart">
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
      <div className="total">
        {/* Exibe o total vendido com cor azul */}
        <h2>Total Vendido: R$ {totalVendido.toFixed(2)}</h2>
      </div>
      {/* Estilos CSS */}
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

        .chart {
          margin-bottom: 40px;
        }

        .total {
          text-align: center;
        }

        /* Estilo para o valor total vendido */
        .total h2 {
          font-size: 24px;
          color: #007bff; /* Cor azul */
        }
      `}</style>
    </div>
  );
}
