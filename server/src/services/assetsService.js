const {
  getAllAssetsRepository,
  getAssetsByPkRepository,
  createAssetsRepository,
  updateAssetsRepository,
  uniqueBrandsRepository,
  uniqueNameRepository,
  uniqueUserRepository,
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

  const search = req.body.description;

  const reqPagination = {
    page,
    limit,
    offset: (page - 1) * limit,
  };

  const getData = await getAllAssetsRepository(reqPagination, search, filter);

  const response = { ...getData, reqPagination };
  return response;
};

const getAllAssetsByPkService = async (id) => {
  return getAssetsByPkRepository(id);
};

const getDropdownAssetsService = async () => {
  const brand = await uniqueBrandsRepository;
  const name = await uniqueNameRepository;
  const user = await uniqueUserRepository;
  const dataDropdown = {
    brand,
    name,
    user,
  };
  return dataDropdown;
};

const createAssetsService = async (req) => {
  const data = {
    name: req.body.name,
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
  const id = req.body.id;
  let data = {
    name: req.body.name,
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
    updatedAt: new Date(),
  };

  // Remove key-value pairs with empty values
  data = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value && value)
  );

  return updateAssetsRepository(id, data);
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
  getDropdownAssetsService,
};
