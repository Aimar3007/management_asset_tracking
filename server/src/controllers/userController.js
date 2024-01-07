const paginationHelper  = require("../helper/paginationHelper");
const { getAllUserService, createUserService } = require("../services/userService");

const getAllUsers = async (req, res) => {
  const page = parseInt(req.body.page);
  const limit = parseInt(req.body.record);
  const x1 = req.session.userId
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

const createUser = async (req, res) => {
  try {
    const newUser = await createUserService(req);
    return res.status(201).json({ message: 'User created', data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getAllUsers, createUser };
