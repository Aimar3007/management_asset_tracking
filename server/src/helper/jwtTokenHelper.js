const jwt = require('jsonwebtoken');

// Middleware untuk verifikasi token JWT
const verifyToken = (req, res, next) => {
  const tokenHeader  = req.headers.authorization; // Mengambil token dari header Authorization
  if (!tokenHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Memisahkan token dari header 'Bearer token'
    const tokenParts = tokenHeader.split(' ');
    const token = tokenParts[1]; // Mengambil bagian token setelah spasi

    const decoded = jwt.verify(token, 'secret'); // Ganti 'secret' dengan secret yang benar
    req.decoded = decoded; // Menyimpan data yang di-decode dari token untuk penggunaan di controller
    next(); // Lanjutkan ke controller jika token valid
  } catch (err) {
    console.log('ini err', err);
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }
};

module.exports = verifyToken 