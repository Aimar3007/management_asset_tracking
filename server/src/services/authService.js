const { findUserByEmailRepository } = require("../repositories/userRepository");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginService = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmailRepository(email);
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!user || !passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Simpan userId dan userEmail dalam sesi
  // req.session.userId = user.id;
  // req.session.userEmail = user.email;

  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: '1h' }); // Ganti dengan secret yang lebih aman
  console.log(token);
  
  return token;
};

module.exports = { loginService };
