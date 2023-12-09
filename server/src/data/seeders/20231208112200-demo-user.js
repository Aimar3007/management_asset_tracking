const bcrypt = require("bcrypt");

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        userName: "Super Admin",
        email: "super.admin@example.com",
        password: await bcrypt.hash("123", 10),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "Admin",
        email: "admin@example.com",
        password: await bcrypt.hash("123", 10),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "Regular",
        email: "Regular@example.com",
        password: await bcrypt.hash("123", 10),
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
