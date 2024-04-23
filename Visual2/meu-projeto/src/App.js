import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/data');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    // Chama fetchData inicialmente
    fetchData();

    // Define o intervalo para chamar fetchData a cada 2 segundos
    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const labels = data.map((item, index) => index + 1);
      const maxSamples = 50; // Define o número máximo de amostras a serem exibidas

      const slicedLabels = labels.slice(-maxSamples);
      const slicedData = data.slice(-maxSamples);

      createChart('umidade-chart', 'Umidade (%)', slicedData.map(item => item.umidade), slicedLabels, 'rgba(255, 99, 132, 1)');
      createChart('luminosidade-chart', 'Luminosidade (lx)', slicedData.map(item => item.luminosidade), slicedLabels, 'rgba(54, 162, 235, 1)');
      createChart('pressao-chart', 'Pressão (hPa)', slicedData.map(item => item.pressao), slicedLabels, 'rgba(255, 206, 86, 1)');
      createChart('temperatura-chart', 'Temperatura (°C)', slicedData.map(item => item.temperatura), slicedLabels, 'rgba(75, 192, 192, 1)');
    }
  }, [data]);

  const createChart = (id, label, data, labels, borderColor) => {
    const ctx = document.getElementById(id).getContext('2d');
    
    // Verifica se já existe um gráfico no canvas
    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy(); // Destroi o gráfico anterior
    }
    
    // Cria o novo gráfico
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          borderColor: borderColor,
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div className="App">
      <div style={{ width: '45%', float: 'left' }}>
        <canvas id="umidade-chart"></canvas>
      </div>
      <div style={{ width: '45%', float: 'left' }}>
        <canvas id="temperatura-chart"></canvas>
      </div>
      <div style={{ width: '45%', float: 'left' }}>
        <canvas id="pressao-chart"></canvas>
      </div>
      <div style={{ width: '45%', float: 'left' }}>
        <canvas id="luminosidade-chart"></canvas>
      </div>
    </div>
  );
}

export default App;
