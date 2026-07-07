const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/objetos', require('./routes/objetos'));
app.use('/api/solicitudes', require('./routes/solicitudes'));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});