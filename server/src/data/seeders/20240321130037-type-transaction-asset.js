"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("TypeTransactionAssets", [
      {
        type: "request",
        createdAt: new Date(),
      },
      {
        type: "return",
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("TypeTransactionAssets", null, {});
  },
};
