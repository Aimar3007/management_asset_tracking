const paginationHelper = require("../helper/paginationHelper");
const {
  getAllUserService,
  createUserService,
  getUserByIdService,
  updateUserService,
} = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const getData = await getAllUserService(req);
    const meta = paginationHelper(getData);
    const response = {
      meta,
      data: getData.rows,
      isSuccess: true,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

const getUsersByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const getData = await getUserByIdService(id);
    const response = {
      data: getData,
      isSuccess: true,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

const getCurrentUser = async (req, res) => {
  const id = req.session.userId;
  try {
    const getDataUser = await getUserByIdService(id);
    const data = {
      data: getDataUser,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await createUserService(req);
    return res.status(201).json({ message: "User created", data: newUser });
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

const updateUser = async (req, res) => {
  try {
    const updateData = await updateUserService(req);
    const response = { message: "User created", data: updateData };
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

module.exports = { getAllUsers, createUser, getCurrentUser, getUsersByPk, updateUser };
