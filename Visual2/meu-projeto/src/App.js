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

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const labels = data.map((item, index) => index + 1);

      createChart('umidade-chart', 'Umidade (%)', data.map(item => item.umidade), labels);
      createChart('luminosidade-chart', 'Luminosidade (lx)', data.map(item => item.luminosidade), labels);
      createChart('pressao-chart', 'Pressão (hPa)', data.map(item => item.pressao), labels);
      createChart('temperatura-chart', 'Temperatura (°C)', data.map(item => item.temperatura), labels);
    }
  }, [data]);

  const createChart = (id, label, data, labels) => {
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
          borderColor: 'rgba(75, 192, 192, 1)',
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
      <div>
        <canvas id="umidade-chart"></canvas>
      </div>
      <div>
        <canvas id="luminosidade-chart"></canvas>
      </div>
      <div>
        <canvas id="pressao-chart"></canvas>
      </div>
      <div>
        <canvas id="temperatura-chart"></canvas>
      </div>
    </div>
  );
}

export default App;
