const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar o corpo das requisições como JSON
app.use(bodyParser.json());

// Rota para receber os dados dos sensores via POST
app.post('/api/sensor-data', (req, res) => {
  const sensorData = req.body;

  // Aqui você pode processar os dados como desejar
  console.log('Dados dos sensores recebidos:', sensorData);

  // Retorna uma resposta de sucesso
  res.status(200).json({ message: 'Dados dos sensores recebidos com sucesso!' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
