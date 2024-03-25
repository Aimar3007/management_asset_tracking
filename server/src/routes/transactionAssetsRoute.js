const express = require("express");
const {
  getAllTransactionAsset,
  createTransactionAsset,
  updateTransactionAsset,
  getDropdownTransactionAsset,
} = require("../controllers/transactionAssetsController");
const verifyToken = require("../helper/jwtTokenHelper");

const router = express.Router();

router.post("/", verifyToken, getAllTransactionAsset);
router.post("/create", verifyToken, createTransactionAsset);
router.put("/", verifyToken, updateTransactionAsset);
router.get("/dropdown-options", verifyToken, getDropdownTransactionAsset);

module.exports = router;
