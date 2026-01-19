const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const petRoutes = require('./routes/petRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/pets', petRoutes);
app.use('/api/activities', activityRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'A API do Pettiary está funcionando!' });
});

app.listen(PORT, () => {
    console.log(`Servidor Pettiary rodando na porta ${PORT}`);
});

module.exports = app;