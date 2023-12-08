const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users.routes');

dotenv.config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Menggunakan rute dari userRoutes
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});