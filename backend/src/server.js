const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const authRoutes = require('./routes/authRoutes');
const apptRoutes = require('./routes/apptRoutes');

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/appointments', apptRoutes);

app.get('/', (req, res) => {
  res.send('API da Oficina AutoFix funcionando perfeitamente! 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
  console.log(`🔗 URL local: http://localhost:${PORT}`);
  console.log(`=============================================`);
});