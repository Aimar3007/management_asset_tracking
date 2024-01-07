const {
  getAllElectronicAssetsService,
  getAllElectronicAssetsByPkService,
  createElectronicAssetsService,
  updateElectronicAssetsService,
  deleteElectronicAssetsService,
} = require("../services/electronicAssetsService");
const paginationHelper = require("../helper/paginationHelper");

const getAllElectronicAssets = async (req, res) => {
  const page = parseInt(req.body.page);
  const limit = parseInt(req.body.record);

  const reqPagination = {
    limit,
    page,
    start: (page - 1) * limit,
    end: page * limit,
  };

  try {
    const getData = await getAllElectronicAssetsService(reqPagination);
    const pagination = paginationHelper(getDataUser.count, reqPagination);
    const data = {
      status: 200,
      pagination,
      data: getData.rows,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getElectronicAssetsByPk = async (req, res) => {
  const id = parseInt(req.body.id);

  try {
    const getData = await getAllElectronicAssetsByPkService(id);
    const data = {
      status: 200,
      data: getData,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createElectronicAssets = async (req, res) => {
  try {
    const getData = await createElectronicAssetsService(req);
    const data = {
      status: 201,
      data: getData,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateElectronicAssets = async (req, res) => {
  try {
    const getData = await updateElectronicAssetsService(req);
    const data = {
      status: 200,
      data: getData,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteElectronicAssets = async (req, res) => {
  try {
    const getData = await deleteElectronicAssetsService(req);
    const data = {
      status: 200,
      data: getData,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllElectronicAssets,
  getElectronicAssetsByPk,
  createElectronicAssets,
  updateElectronicAssets,
  deleteElectronicAssets,
};
