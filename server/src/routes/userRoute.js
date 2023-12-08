const express = require('express');
const controllerUser = require('../controllers/users')

const {getAllUsers} = controllerUser

const router = express.Router();

router.get('/', getAllUsers);

module.exports = router;
