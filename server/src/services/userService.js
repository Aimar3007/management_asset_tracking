const {
  getAllUserRepository,
  createUserRepository,
  getUserByIdRepository,
  updateDataRepository,
} = require("../repositories/userRepository");
const bcrypt = require("bcrypt");

const getAllUserService = async (req) => {
  const page = parseInt(req.body.page);
  const limit = parseInt(req.body.record);
  const reqPagination = {
    limit,
    page,
    start: (page - 1) * limit,
    end: page * limit,
  };

  let filter = {
    status: req.body.status,
    city: req.body.city,
  };

  // Remove key-value pairs with empty values
  filter = Object.fromEntries(
    Object.entries(filter).filter(([_, value]) => value && value)
  );

  const search = req.body.userName;
  const getData = await getAllUserRepository(reqPagination, search, filter);
  const response = { ...getData, reqPagination };
  return response;
};

const getUserByIdService = async (id) => {
  return getUserByIdRepository(id);
};

const createUserService = async (req) => {
  const { userName, password, email, roleId } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  return createUserRepository(userName, email, hashedPassword, roleId);
};

const updateUserService = async (req) => {
  const id = req.body.id;
  let data = {
    userName: req.body.userName,
    email: req.body.email,
    deletedAt: req.body.deletedAt,
  };

  // Remove key-value pairs with empty values
  data = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value && value)
  );

  return updateDataRepository(id, data);
};

module.exports = {
  getAllUserService,
  createUserService,
  getUserByIdService,
  updateUserService,
};
