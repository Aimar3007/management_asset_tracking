import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import User from './models/user.mjs';
// import sequelize from './sequelize.mjs';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// sequelize.sync().then(() => {
//   console.log('Tabel telah disinkronkan');
// }).catch((err) => {
//   console.log('Tidak bisa mensinkronkan tabel:', err);
// });

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
