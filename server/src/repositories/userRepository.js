const { Op } = require("sequelize");
const { User, Role } = require("../models");

const getAllUserRepository = (reqPagination, search, filter) => {
  const data = User.findAndCountAll({
    offset: reqPagination.start,
    limit: reqPagination.limit,
    where: {
      ...(search && {
        userName: { [Op.substring]: search },
      }),
      ...(filter && filter),
    },
    include: [
      {
        model: Role,
        as: "role", // Mengacu pada alias yang ditentukan dalam asosiasi
      },
    ],
  });
  return data;
};

const createUserRepository = (userName, email, password, roleId) => {
  const user = User.create({ userName, email, password, roleId });
  return user;
};

const findUserByEmailRepository = (email) => {
  const x1 = User.findOne({
    where: { email },
    include: [
      {
        model: Role,
        as: "role", // Mengacu pada alias yang ditentukan dalam asosiasi
      },
    ],
  });
  return x1;
};

const getUserByIdRepository = async (id) => {
  const response = User.findByPk(id, {
    include: [
      {
        model: Role,
        as: "role", // Mengacu pada alias yang ditentukan dalam asosiasi
      },
    ],
  });
  return response;
};

const updateDataRepository = async (id, data) => {
  const findDataById = await getUserByIdRepository(id);
  const updateData = await findDataById.update(data);
  return updateData;
};

module.exports = {
  getAllUserRepository,
  createUserRepository,
  findUserByEmailRepository,
  getUserByIdRepository,
  updateDataRepository,
};
