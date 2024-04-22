import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function App() {
  const humidityChartRef = useRef(null);
  const temperatureChartRef = useRef(null);
  const lightChartRef = useRef(null);
  const pressureChartRef = useRef(null);
  const [humidityData, setHumidityData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [pressureData, setPressureData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const humidityResponse = await axios.get('/api/humidity');
        const temperatureResponse = await axios.get('/api/temperature');
        const lightResponse = await axios.get('/api/light');
        const pressureResponse = await axios.get('/api/pressure');
        
        setHumidityData(humidityResponse.data);
        setTemperatureData(temperatureResponse.data);
        setLightData(lightResponse.data);
        setPressureData(pressureResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const setupChart = (chartRef, data, label, color) => {
      new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: data.map((_, index) => `Label ${index}`), // Substitua pelos rótulos reais
          datasets: [{
            label: label,
            data: data,
            fill: false,
            borderColor: color,
            tension: 0.1
          }]
        }
      });
    };

    setupChart(
      humidityChartRef,
      humidityData,
      'Humidity',
      'rgb(255, 99, 132)'
    );

    setupChart(
      temperatureChartRef,
      temperatureData,
      'Temperature',
      'rgb(75, 192, 192)'
    );

    setupChart(
      lightChartRef,
      lightData,
      'Light',
      'rgb(255, 205, 86)'
    );

    setupChart(
      pressureChartRef,
      pressureData,
      'Pressure',
      'rgb(54, 162, 235)'
    );
  }, [humidityData, temperatureData, lightData, pressureData]);

  return (
    <div className="App">
      <header className="App-header">

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ marginRight: '20px' }}>
            <h3>Humidity</h3>
            <canvas ref={humidityChartRef}></canvas>
          </div>
          <div>
            <h3>Temperature</h3>
            <canvas ref={temperatureChartRef}></canvas>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ marginRight: '20px' }}>
            <h3>Light</h3>
            <canvas ref={lightChartRef}></canvas>
          </div>
          <div>
            <h3>Pressure</h3>
            <canvas ref={pressureChartRef}></canvas>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
