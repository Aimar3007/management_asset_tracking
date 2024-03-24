const express = require("express");
const {
  getAllUsers,
  createUser,
  getCurrentUser,
  getUsersByPk,
  updateUser,
} = require("../controllers/userController");
const verifyToken = require("../helper/jwtTokenHelper");

const router = express.Router();

router.post("/", verifyToken, getAllUsers);
router.get("/details/:id", getUsersByPk);
router.get("/current-user", verifyToken, getCurrentUser);
router.post("/create", verifyToken, createUser);
router.put("/", verifyToken, updateUser);

module.exports = router;
