'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("StatusTransactionAssets", [
      {
        type: "pending",
        createdAt: new Date(),
      },
      {
        type: "approve",
        createdAt: new Date(),
      },
      {
        type: "reject",
        createdAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("StatusTransactionAssets", null, {});

  }
};
