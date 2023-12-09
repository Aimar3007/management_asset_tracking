const express = require('express');
const { getAllUsers, createUser } = require('../controllers/userController');
const verifyToken  = require('../helper/jwtTokenHelper');

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.post('/', createUser)

module.exports = router;
