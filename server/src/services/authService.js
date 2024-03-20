const { findUserByEmailRepository } = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginService = async (req) => {
  const { email, password } = req.body;
  const user = await findUserByEmailRepository(email);

  if (!user) {
    return {
      data: {},
      status: 401,
      message: "Incorrect email or password",
      isSuccess: false,
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return {
      data: {},
      status: 401,
      message: "Incorrect email or password",
      isSuccess: false,
    };
  }

  // Simpan userId dan userEmail dalam sesi
  req.session.userId = user.id;
  req.session.userEmail = user.email;

  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" }); // Ganti dengan secret yang lebih aman
  const data = {
    user,
    token,
  };

  return {
    data,
    status: 200,
    message: "Login successful",
    isSuccess: true,
  };
};

module.exports = { loginService };
