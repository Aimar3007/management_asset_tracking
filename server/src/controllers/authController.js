const { loginService } = require("../services/authService");

const login = async (req, res) => {
  try {
		const token = await loginService(req,res)
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { login };
