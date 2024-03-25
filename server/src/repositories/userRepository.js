const { Op } = require("sequelize");
const { User, Role } = require("../models");

const getAllUserRepository = (reqPagination, search, deletedAt, filter) => {
  let whereCondition = {
    ...(search && {
      userName: { [Op.substring]: search },
    }),
    ...(filter && filter),
  };

  // Jika deletedAt === 1, tampilkan data dimana deletedAt !== null
  if (deletedAt === 1) {
    whereCondition.deletedAt = {
      [Op.ne]: null,
    };
  }
  // Jika deletedAt === 0, tampilkan data dimana deletedAt === null
  else if (deletedAt === 0) {
    whereCondition.deletedAt = {
      [Op.eq]: null,
    };
  }

  const data = User.findAndCountAll({
    offset: reqPagination.start,
    limit: reqPagination.limit,
    where: whereCondition,
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

const uniqueUserRepository = User.findAll({
  attributes: ["id", "userName"], // Pilih kolom brand saja
  group: ["id", "userName"], // Kelompokkan berdasarkan kolom brand
});

const uniqueCityRepository = User.findAll({
  attributes: ["city"], // Pilih kolom brand saja
  group: ["city"], // Kelompokkan berdasarkan kolom brand
});

module.exports = {
  getAllUserRepository,
  createUserRepository,
  findUserByEmailRepository,
  getUserByIdRepository,
  updateDataRepository,
  uniqueUserRepository,
  uniqueCityRepository,
};
