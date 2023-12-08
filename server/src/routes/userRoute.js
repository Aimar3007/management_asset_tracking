const express = require('express');
const controllerUser = require('../controllers/userController')

const {getAllUsers} = controllerUser

const router = express.Router();

router.get('/', getAllUsers);

module.exports = router;
