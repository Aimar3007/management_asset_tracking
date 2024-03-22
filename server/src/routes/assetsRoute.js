const express = require("express");
const {
  getAllAssets,
  getAssetsByPk,
  createAssets,
  updateAssets,
  deleteAssets,
} = require("../controllers/assetsController");

const router = express.Router();

router.post("/", getAllAssets);
router.get("/details", getAssetsByPk);
router.post("/create", createAssets);
router.put("", updateAssets);
router.delete("/", deleteAssets);

module.exports = router;
