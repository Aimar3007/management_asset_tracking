const { loginService } = require("../services/authService");

const login = async (req, res) => {
  try {
		const x1 = await loginService(req,res)
    return res.status(200).json({ message: "Login successful", x1 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { login };
