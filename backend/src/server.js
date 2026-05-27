const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const authRoutes = require('./routes/authRoutes');
const apptRoutes = require('./routes/apptRoutes');

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/appointments', apptRoutes);

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('API da Oficina AutoFix funcionando perfeitamente! 🚀');
});

// Porta do .env ou 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
  console.log(`🔗 URL local: http://localhost:${PORT}`);
  console.log(`=============================================`);
});