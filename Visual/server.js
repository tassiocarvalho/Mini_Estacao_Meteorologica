const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Define o diretório público para servir arquivos estáticos (se necessário)
// app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o aplicativo React compilado
app.use(express.static(path.join(__dirname, 'meu-projeto/build')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'meu-projeto/build', 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
