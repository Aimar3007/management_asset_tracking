const { Op } = require("sequelize");
const { Assets, User } = require("../models");

const getAllAssetsRepository = (reqPagination, search, filter) => {
  const data = Assets.findAndCountAll({
    offset: reqPagination.start,
    limit: reqPagination.limit,
    where: {
      ...(search && {
        description: { [Op.substring]: search },
      }),
      ...(filter && filter),
    },
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

const updateAssetsRepository = async (id, data) => {
  const finDataAsset = await getAssetsByPkRepository(id);
  return finDataAsset.update(data);
};

module.exports = {
  getAllAssetsRepository,
  getAssetsByPkRepository,
  createAssetsRepository,
  updateAssetsRepository,
};
