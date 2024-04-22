const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar o corpo das requisições como JSON
app.use(bodyParser.json());

// Rota para enviar os dados dos sensores via GET
app.get('/api/sensor-data', (req, res) => {
  // Simulação de dados dos sensores
  const sensorData = {
    humidity: 50.5,
    temperature: 25.3,
    light: 100,
    pressure: 1013.2
  };

  // Retorna os dados dos sensores como resposta
  res.status(200).json(sensorData);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
