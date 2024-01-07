const { ElectronicAssets } = require("../models");

const getAllElectronicAssetsRepository = (reqPagination) => {
  const data = ElectronicAssets.findAndCountAll({
    offset: reqPagination.start,
    limit: reqPagination.limit,
  });
  return data;
};

const getElectronicAssetsByPkRepository = (id) => {
  return ElectronicAssets.findByPk(id);
};

const createElectronicAssetsRepository = (data) => {
  return ElectronicAssets.create(data);
};

const updateElectronicAssetsRepository = (data) => {
  return ElectronicAssets.update(data.dataValues, {
    where: { id: data.dataValues.id },
  });
};

module.exports = {
  getAllElectronicAssetsRepository,
  getElectronicAssetsByPkRepository,
  createElectronicAssetsRepository,
  updateElectronicAssetsRepository,
};
