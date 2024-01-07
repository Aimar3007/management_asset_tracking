const {
  getAllElectronicAssetsRepository,
  getElectronicAssetsByPkRepository,
  createElectronicAssetsRepository,
  updateElectronicAssetsRepository,
  deleteElectronicAssetsRepository,
} = require("../repositories/electronicAssetsRepository");

const getAllElectronicAssetsService = async (reqPagination) => {
  return getAllElectronicAssetsRepository(reqPagination);
};

const getAllElectronicAssetsByPkService = async (id) => {
  return getElectronicAssetsByPkRepository(id);
};

const createElectronicAssetsService = async (req) => {
  const data = {
    name: req.body.namem,
    description: req.body.description,
    brand: req.body.brand,
    serialNumber: req.body.serialNumber,
    condition: req.body.condition,
    purchaseDate: req.body.purchaseDate,
    userId: req.body.userId,
    city: req.body.city,
    previousUserId: req.body.previousUserId,
    notes: req.body.notes,
    lastDateOfRepair: req.body.lastDateOfRepair,
    image: req.body.image,
    reasonToRemoveAssets: req.body.reasonToRemoveAssets,
    createdAt: new Date(),
    // createdBy: req.body.createdBy,
  };

  return createElectronicAssetsRepository(data);
};

const updateElectronicAssetsService = async (req) => {
  const previousData = await getElectronicAssetsByPkRepository(req.body.id);
  previousData.name = req.body.name;
  previousData.description = req.body.description;
  previousData.brand = req.body.brand;
  previousData.serialNumber = req.body.serialNumber;
  previousData.condition = req.body.condition;
  previousData.purchaseDate = req.body.purchaseDate;
  previousData.userId = req.body.userId;
  previousData.city = req.body.city;
  previousData.previousUserId = req.body.previousUserId;
  previousData.notes = req.body.notes;
  previousData.lastDateOfRepair = req.body.lastDateOfRepair;
  previousData.image = req.body.image;
  previousData.updatedAt = new Date();
  // previousData.updatedBy = req.body.updatedBy;

  return updateElectronicAssetsRepository(previousData);
};

const deleteElectronicAssetsService = async (req) => {
  const deleteData = await getElectronicAssetsByPkRepository(req.body.id);
  deleteData.reasonToRemoveAssets = req.body.reasonToRemoveAssets
  deleteData.deletedAt = req.body.deletedAt
  deleteData.deletedBy = req.body.deletedBy
  return updateElectronicAssetsRepository(deleteData);
};

module.exports = {
  getAllElectronicAssetsService,
  getAllElectronicAssetsByPkService,
  createElectronicAssetsService,
  updateElectronicAssetsService,
  deleteElectronicAssetsService,
};
