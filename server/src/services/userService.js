const {
  getAllUserRepository,
  createUserRepository,
  getUserByIdRepository,
  updateDataRepository,
  uniqueCityRepository,
  uniqueUserRepository,
} = require("../repositories/userRepository");
const bcrypt = require("bcrypt");

const getAllUserService = async (req) => {
  const page = parseInt(req.body.page);
  const limit = parseInt(req.body.record);
  const reqPagination = {
    page,
    limit,
    offset: (page - 1) * limit,
  };

  let filter = {
    city: req.body.city,
  };

  // Remove key-value pairs with empty values
  filter = Object.fromEntries(
    Object.entries(filter).filter(([_, value]) => value && value)
  );

  const search = req.body.userName;
  const deletedAt = parseInt(req.body.deletedAt);
  const getData = await getAllUserRepository(
    reqPagination,
    search,
    deletedAt,
    filter
  );
  const response = { ...getData, reqPagination };
  return response;
};

const getUserByIdService = async (id) => {
  return getUserByIdRepository(id);
};

const getDropdownUserService = async () => {
  const user = await uniqueUserRepository;
  const city = await uniqueCityRepository;
  const dataDropdown = {
    user,
    city,
  };
  return dataDropdown;
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
  };

  // Remove key-value pairs with empty values
  data = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value && value)
  );

  const deletedAt = req.body.deletedAt;
  const newData = { ...data, deletedAt };

  return updateDataRepository(id, newData);
};

module.exports = {
  getAllUserService,
  createUserService,
  getUserByIdService,
  updateUserService,
  getDropdownUserService,
};
