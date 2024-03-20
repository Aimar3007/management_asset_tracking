"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("RepairHistories", [
      {
        assetsId: 1,
        dateOfRepair: new Date(),
        description: "Repair Keyboard",
        createdAt: new Date(),
      },
      // {
      //   assetsId: 17,
      //   dateOfRepair: new Date(),
      //   description: "Repair Keyboard",
      //   createdAt: new Date(),
      // },
      // {
      //   assetsId: 18,
      //   dateOfRepair: new Date(),
      //   description: "Upgrade Ram 8gb-16gb",
      //   createdAt: new Date(),
      // },
      // {
      //   assetsId: 19,
      //   dateOfRepair: new Date(),
      //   description: "Repair Fan",
      //   createdAt: new Date(),
      // },
      // {
      //   assetsId: 20,
      //   dateOfRepair: new Date(),
      //   description: "Repair Fan",
      //   createdAt: new Date(),
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("RepairHistories", null, {});
  },
};
