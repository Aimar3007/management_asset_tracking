"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("RepairHistories", [
      {
        assetsId: 16,
        dateOfRepair: new Date(),
        description: "Repair Keyboard",
      },
      {
        assetsId: 17,
        dateOfRepair: new Date(),
        description: "Repair Keyboard",
      },
      {
        assetsId: 18,
        dateOfRepair: new Date(),
        description: "Upgrade Ram 8gb-16gb",
      },
      {
        assetsId: 19,
        dateOfRepair: new Date(),
        description: "Repair Fan",
      },
      {
        assetsId: 20,
        dateOfRepair: new Date(),
        description: "Repair Fan",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("RepairHistories", null, {});
  },
};
