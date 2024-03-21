const express = require("express");
const {
  getAllTransactionAsset, createTransactionAsset, updateTransactionAsset,
} = require("../controllers/transactionAssetsController");
const verifyToken = require("../helper/jwtTokenHelper");

const router = express.Router();

router.get("/", verifyToken, getAllTransactionAsset);
router.post("/", verifyToken, createTransactionAsset);
router.put("/", verifyToken, updateTransactionAsset);

module.exports = router;
