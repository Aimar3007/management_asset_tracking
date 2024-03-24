const {
  getAllAssetsService,
  getAllAssetsByPkService,
  createAssetsService,
  updateAssetsService,
  deleteAssetsService,
  getDropdownAssetsService,
} = require("../services/assetsService");
const paginationHelper = require("../helper/paginationHelper");

const getAllAssets = async (req, res) => {
  try {
    const getData = await getAllAssetsService(req);
    const meta = paginationHelper(getData);
    const response = {
      data: getData.rows,
      meta,
      isSuccess: true,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

const getAssetsByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const getData = await getAllAssetsByPkService(id);
    const response = {
      status: 200,
      data: getData,
      isSuccess: true,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

const createAssets = async (req, res) => {
  try {
    const getData = await createAssetsService(req);
    const response = {
      status: 201,
      data: getData,
      isSuccess: true,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

const updateAssets = async (req, res) => {
  try {
    const getData = await updateAssetsService(req);
    const response = {
      status: 200,
      data: getData,
      isSuccess: true,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};

const deleteAssets = async (req, res) => {
  try {
    const getData = await deleteAssetsService(req);
    const response = {
      status: 200,
      data: getData,
      isSuccess: true,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = { message: "Internal server error", isSuccess: false };
    res.status(500).json(response);
  }
};


const getDropdownAsset = async (req, res) => {
  try {
    const getData = await getDropdownAssetsService();
    const response = {
      data: getData,
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
  getAllAssets,
  getAssetsByPk,
  createAssets,
  updateAssets,
  deleteAssets,
  getDropdownAsset,
};
