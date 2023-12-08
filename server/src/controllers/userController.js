const { paginationHelper } = require("../helper/paginationHelper");
const { getAllUserService } = require("../services/userService");
let controller = {}

controller.getAllUsers = async (req, res) => {
  const page = parseInt(req.body.page);
  const limit = parseInt(req.body.record);

  const reqPagination = {
    limit,
    page,
    start: (page - 1) * limit,
    end: page * limit,
  };

  try {
    const getDataUser =  await getAllUserService(reqPagination)
    const pagination  = paginationHelper(getDataUser.count, reqPagination)
    const data = {
      status: 200,
      pagination,
      data:getDataUser.rows,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

};

module.exports = controller;
