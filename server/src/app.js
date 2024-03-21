const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoute");
const auth = require("./routes/authRoute");
const assets = require("./routes/assetsRoute");
const transactionAssetsRoute = require("./routes/transactionAssetsRoute");

dotenv.config();

const app = express();
const port = 3001;

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(cors());

// Menggunakan rute dari userRoutes
app.use("/user", userRoutes);
app.use("/auth", auth);
app.use("/assets", assets);
app.use("/transaction-assets", transactionAssetsRoute);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
