const express = require("express");
const {
  getAllAssets,
  getAssetsByPk,
  createAssets,
  updateAssets,
  deleteAssets,
  getDropdownAsset,
} = require("../controllers/assetsController");
const verifyToken = require("../helper/jwtTokenHelper");

const router = express.Router();

router.post("/", verifyToken, getAllAssets);
router.get("/details/:id", verifyToken, getAssetsByPk);
router.post("/create", verifyToken, createAssets);
router.put("/", verifyToken, updateAssets);
router.delete("/", verifyToken, deleteAssets);
router.get("/dropdown-options", verifyToken, getDropdownAsset);

module.exports = router;
