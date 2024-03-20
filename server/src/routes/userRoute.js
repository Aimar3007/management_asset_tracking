const express = require('express');
const { getAllUsers, createUser, getCurrentUser, getUsersByPk } = require('../controllers/userController');
const verifyToken  = require('../helper/jwtTokenHelper');

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.get('/details', getUsersByPk);
router.get('/current-user', verifyToken, getCurrentUser);
router.post('/', createUser)

module.exports = router;
