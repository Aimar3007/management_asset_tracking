const {
  getAllAssetsRepository,
  getAssetsByPkRepository,
  createAssetsRepository,
  updateAssetsRepository,
  // deleteAssetsRepository,
} = require("../repositories/assetsRepository");

const getAllAssetsService = async (req) => {
  const page = parseInt(req.body.page);
  const limit = parseInt(req.body.record);

  let filter = {
    name: req.body.name,
    brand: req.body.brand,
    userId: req.body.userId,
  };
  // Remove key-value pairs with empty values
  filter = Object.fromEntries(
    Object.entries(filter).filter(([_, value]) => value && value)
  );

  const search = req.body.description
    
  const reqPagination = {
    limit,
    page,
    start: (page - 1) * limit,
    end: page * limit,
  };

  const getData = await getAllAssetsRepository(reqPagination, search, filter);

  const response = { ...getData, reqPagination };
  return response;
};

const getAllAssetsByPkService = async (id) => {
  return getAssetsByPkRepository(id);
};

const createAssetsService = async (req) => {
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

  return createAssetsRepository(data);
};

const updateAssetsService = async (req) => {
  const previousData = await getAssetsByPkRepository(req.body.id);
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

  return updateAssetsRepository(previousData);
};

const deleteAssetsService = async (req) => {
  const deleteData = await getAssetsByPkRepository(req.body.id);
  deleteData.reasonToRemoveAssets = req.body.reasonToRemoveAssets;
  deleteData.deletedAt = req.body.deletedAt;
  deleteData.deletedBy = req.body.deletedBy;
  return updateAssetsRepository(deleteData);
};

module.exports = {
  getAllAssetsService,
  getAllAssetsByPkService,
  createAssetsService,
  updateAssetsService,
  deleteAssetsService,
};
