const {
  getAllTransactionAssetsRepository,
  createTransactionAssetsRepository,
  updateTransactionAssetsRepository,
  getAlltypeTransactionAsset,
  getAllStatusTransactionAssets,
} = require("../repositories/transactionAssetsRepository");
const { uniqueUserRepository } = require("../repositories/userRepository");

const getAllTransactionAssetsService = async (req) => {
  const page = parseInt(req.body.page);
  const limit = parseInt(req.body.record);

  let filter = {
    statusTransactionAssetId: req.body.statusTransactionAssetId,
    userId: req.body.userId,
    typeTransactionAssetId: req.body.typeTransactionAssetId,
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

  const getData = await getAllTransactionAssetsRepository(
    reqPagination,
    search,
    filter
  );

  const response = { ...getData, reqPagination };
  return response;
};

const createTransactionAssetService = async (req) => {
  const data = {
    userId: req.body.userId,
    assetId: req.body.assetId,
    reasonRequest: req.body.reasonRequest,
    typeTransactionAssetId: req.body.typeTransactionAssetId,
    createdAt: new Date(),
  };

  return createTransactionAssetsRepository(data);
};

const updateTransactionAssetService = async (req) => {
  const id = req.body.id;
  let data = {
    userId: req.body.userId,
    assetId: req.body.assetId,
    reasonRequest: req.body.reasonRequest,
    reasonReject: req.body.reasonReject,
    typeTransactionAssetId: req.body.typeTransactionAssetId,
    statusTransactionAssetId: req.body.statusTransactionAssetId,
    updatedAt: new Date(),
    deletedAt: req.body.deletedAt,
  };

  // Remove key-value pairs with empty values
  data = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value && value)
  );

  console.log("data", data);

  return updateTransactionAssetsRepository(id, data);
};

const getDropdownTransactionAssetService = async () => {
  const user = await uniqueUserRepository;
  const typeTransactionAsset = await getAlltypeTransactionAsset;
  const statusTransactionAsset = await getAllStatusTransactionAssets;
  const dataDropdown = {
    user,
    typeTransactionAsset,
    statusTransactionAsset,
  };
  return dataDropdown;
};

module.exports = {
  getAllTransactionAssetsService,
  createTransactionAssetService,
  updateTransactionAssetService,
  getDropdownTransactionAssetService,
};
