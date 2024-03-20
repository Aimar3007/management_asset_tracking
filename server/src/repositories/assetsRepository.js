const { Op } = require("sequelize");
const { Assets, User } = require("../models");

const getAllAssetsRepository = (reqPagination, search, filter) => {
  const data = Assets.findAndCountAll({
    offset: reqPagination.start,
    limit: reqPagination.limoiit,
    where: {
      ...(search && {
        description: { [Op.substring]: search },
      }),
      ...(filter && filter),
    },
  });
  return data;
};

const getAssetsByPkRepository = (id) => {
  return Assets.findByPk(id, {
    include: [
      {
        model: User,
        as: "user", // Mengacu pada alias yang ditentukan dalam asosiasi
      },
      {
        model: User,
        as: "previousUser", // Mengacu pada alias yang ditentukan dalam asosiasi
      },
    ],
  });
};

const createAssetsRepository = (data) => {
  return Assets.create(data);
};

const updateAssetsRepository = (data) => {
  return Assets.update(data.dataValues, {
    where: { id: data.dataValues.id },
  });
};

module.exports = {
  getAllAssetsRepository,
  getAssetsByPkRepository,
  createAssetsRepository,
  updateAssetsRepository,
};
