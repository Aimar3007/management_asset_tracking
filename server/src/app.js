const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoute');
const auth = require('./routes/authRoute');

dotenv.config();

const app = express();
const port = 3001;

app.use(session({
  secret: 'secret-key', // Ganti dengan secret yang lebih aman
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(cors());

// Menggunakan rute dari userRoutes
app.use('/user', userRoutes);
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});