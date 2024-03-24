const express = require("express");
const {
  getAllTransactionAsset, createTransactionAsset, updateTransactionAsset,
} = require("../controllers/transactionAssetsController");
const verifyToken = require("../helper/jwtTokenHelper");

const router = express.Router();

router.post("/", verifyToken, getAllTransactionAsset);
router.post("/create", verifyToken, createTransactionAsset);
router.put("/", verifyToken, updateTransactionAsset);

module.exports = router;
