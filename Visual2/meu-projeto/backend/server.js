const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe a biblioteca cors

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use o middleware cors
app.use(cors());

app.get('/data', (req, res) => {
  res.send('Servidor Node.js funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
