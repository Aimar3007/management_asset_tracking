const { loginService } = require("../services/authService");

const login = async (req, res) => {
  try {
    const service = await loginService(req);
    return res.status(service?.status).json({
      message: service?.message,
      data: service?.data,
      isSuccess: service?.isSuccess,
    });
  } catch (error) {
    console.error(error);
    console.log("error", error);
    return res
      .status(500)
      .json({ message: "Internal server error", isSuccess: false });
  }
};

module.exports = { login };
