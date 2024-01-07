const express = require('express');
const { getAllElectronicAssets, getElectronicAssetsByPk, createElectronicAssets, updateElectronicAssets, deleteElectronicAssets } = require('../controllers/electronicAssetsController');

const router = express.Router();

router.get('/',  getAllElectronicAssets);
router.get('/details',  getElectronicAssetsByPk);
router.post('/',  createElectronicAssets);
router.put('/',  updateElectronicAssets);
router.delete('/',  deleteElectronicAssets);

module.exports = router;
