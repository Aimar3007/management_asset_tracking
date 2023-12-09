"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Roles", [
      {
        type: "super-admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "regular",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
