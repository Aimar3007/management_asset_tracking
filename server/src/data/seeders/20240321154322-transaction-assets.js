"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("TranscationAssets", [
      {
        userId: 2,
        assetId: 2,
        typeTransactionAssetId: 1,
        statusTransactionAssetId: 1,
        manageBy: 1,
        createdAt: new Date(),
      },
      {
        userId: 3,
        assetId: 3,
        typeTransactionAssetId: 1,
        statusTransactionAssetId: 1,
        manageBy: 1,
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("TranscationAssets", null, {});
  },
};
