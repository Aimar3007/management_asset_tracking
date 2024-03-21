const paginationHelper = require("../helper/paginationHelper");
const {
  getAllTransactionAssetsService,
  createTransactionAssetService,
  updateTransactionAssetService,
} = require("../services/transactionAssetsService");

const getAllTransactionAsset = async (req, res) => {
  try {
    const getData = await getAllTransactionAssetsService(req);
    const pagination = paginationHelper(getData.count, getData.reqPagination);
    const response = {
      data: getData.rows,
      pagination,
      isSuccess: true,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

const createTransactionAsset = async (req, res) => {
  try {
    const createTransactionAsset = await createTransactionAssetService(req);
    const response = {
      status: 201,
      data: createTransactionAsset,
      isSuccess: true,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

const updateTransactionAsset = async (req, res) => {
  try {
    const updateData = await updateTransactionAssetService(req);
    const response = {
      data: updateData,
      isSuccess: true,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

module.exports = {
  getAllTransactionAsset,
  createTransactionAsset,
  updateTransactionAsset,
};
