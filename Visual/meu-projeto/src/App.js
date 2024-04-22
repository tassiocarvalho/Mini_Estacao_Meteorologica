import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function App() {
  const [sensorData, setSensorData] = useState({
    humidity: null,
    temperature: null,
    light: null,
    pressure: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/sensor-data/');
        const data = response.data;
        setSensorData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Executa a primeira vez quando o componente é montado

    const interval = setInterval(fetchData, 2000); // Alterado para 2 segundos

    return () => {
      clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr>
              <th>Humidade</th>
              <th>Temperatura</th>
              <th>Luminosidade</th>
              <th>Pressão</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{sensorData.humidity}</td>
              <td>{sensorData.temperature}</td>
              <td>{sensorData.light}</td>
              <td>{sensorData.pressure}</td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
