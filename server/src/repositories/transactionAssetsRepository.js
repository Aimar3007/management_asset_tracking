const { Op } = require("sequelize");
const {
  TranscationAssets,
  User,
  Assets,
  TypeTransactionAsset,
  StatusTransactionAssets,
} = require("../models");

const getAllTransactionAssetsRepository = async (
  reqPagination,
  search,
  filter
) => {
  const data = TranscationAssets.findAndCountAll({
    offset: reqPagination.start,
    limit: reqPagination.limit,
    where: {
      ...(filter && filter),
      deletedAt: {
        [Op.is]: null,
      },
    },
    include: [
      {
        model: User,
        as: "user", // Mengacu pada alias yang ditentukan dalam asosiasi
      },
      {
        model: User,
        as: "manageByUser", // Mengacu pada alias yang ditentukan dalam asosiasi
      },
      {
        model: Assets,
        as: "asset", // Mengacu pada alias yang ditentukan dalam asosiasi
        where: {
          ...(search && {
            description: { [Op.substring]: search },
          }),
        },
      },
      {
        model: TypeTransactionAsset,
        as: "type", // Mengacu pada alias yang ditentukan dalam asosiasi
      },
      {
        model: StatusTransactionAssets,
        as: "statusTransaction", // Mengacu pada alias yang ditentukan dalam asosiasi
      },
    ],
  });
  return data;
};

const getTransactionAssetsByPkRepository = (id) => {
  return TranscationAssets.findByPk(id);
};

const createTransactionAssetsRepository = (data) => {
  return TranscationAssets.create(data);
};

const updateTransactionAssetsRepository = async (id, data) => {
  const finData = await getTransactionAssetsByPkRepository(id);
  return finData.update(data);
};

const getAlltypeTransactionAsset = TypeTransactionAsset.findAll();

const getAllStatusTransactionAssets = StatusTransactionAssets.findAll();

module.exports = {
  getAllTransactionAssetsRepository,
  updateTransactionAssetsRepository,
  createTransactionAssetsRepository,
  getAlltypeTransactionAsset,
  getAllStatusTransactionAssets,
};
